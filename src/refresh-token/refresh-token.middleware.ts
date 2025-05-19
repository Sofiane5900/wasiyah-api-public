import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { RefreshTokenRepository } from './refresh-token.repository';
import { MusiRepository } from 'src/musi/musi.repository';
import { JwtService } from '@nestjs/jwt';

interface CookieMap {
  [key: string]: string;
}
@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly musiRepository: MusiRepository,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: FastifyRequest, res: any, next: () => void) {
    const cookieHeader = req.headers.cookie;

    if (!cookieHeader) {
      return next();
    }

    const cookies: CookieMap = Object.fromEntries(
      cookieHeader.split('; ').map((c) => {
        const [k, ...v] = c.split('=');
        return [k, v.join('=')];
      }),
    );

    const accessToken = cookies.access_token;
    const refreshToken = cookies.refresh_token;

    // console.log(accessToken, 'accessToken');
    // console.log(refreshToken, 'refreshToken');

    if (!refreshToken) {
      return next();
    }

    // Vérifie si le access token est expiré
    let isAccessTokenExpired = false;
    let isAccessTokenPresent = false;

    if (accessToken) {
      isAccessTokenPresent = true;
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const decodedToken = this.jwtService.decode(accessToken);

        if (
          decodedToken &&
          typeof decodedToken === 'object' &&
          decodedToken.exp
        ) {
          const expirationDate = new Date(decodedToken.exp * 1000);
          const now = new Date();
          // console.log('expiredDate', expirationDate);
          // console.log('now', now);

          isAccessTokenExpired = expirationDate <= now;
          // console.log('Access token est expiré:', isAccessTokenExpired);
        } else {
          isAccessTokenExpired = true;
        }
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        isAccessTokenExpired = true;
      }
    } else {
      isAccessTokenExpired = true;
    }

    if (isAccessTokenPresent && !isAccessTokenExpired) {
      return next();
    }

    const storedToken = await this.refreshTokenRepository.findOneBy({
      token: refreshToken,
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      if (isAccessTokenExpired) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
      }
      return next();
    }

    const musi = await this.musiRepository.findOneBy({
      email: storedToken.email,
    });
    // console.log(musi, 'call find email musssi in middleware');

    if (!musi || !musi.isEmailVerified) {
      return next();
    }

    (req as any).user = musi;
    (req as any).needsAccessTokenRefresh = true;

    next();
  }
}
