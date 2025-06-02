import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { RefreshTokenRepository } from './refresh-token.repository';
import { MusiRepository } from 'src/musi/musi.repository';
import { JwtService } from '@nestjs/jwt';
import { RequestWithRefresh } from './request-refresh.interface';

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

  async use(req: RequestWithRefresh, res: FastifyReply, next: () => void) {
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

    if (!refreshToken) {
      return next();
    }

    // verify if token is expired
    let isAccessTokenExpired = false;
    let isAccessTokenPresent = false;

    if (accessToken) {
      isAccessTokenPresent = true;
      try {
        /* eslint-disable @typescript-eslint/no-unsafe-assignment*/
        const decodedToken = this.jwtService.decode(accessToken);

        if (
          decodedToken &&
          typeof decodedToken === 'object' &&
          decodedToken.exp
        ) {
          const expirationDate = new Date(decodedToken.exp * 1000);
          const now = new Date();

          isAccessTokenExpired = expirationDate <= now;
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

    if (!musi || !musi.isEmailVerified) {
      return next();
    }

    req.user = musi;
    req.needsAccessTokenRefresh = true;
    req.refreshToken = storedToken?.token;
    console.log('User found:', (req as any).user);
    console.log(
      'needsAccessTokenRefresh:',
      (req as any).needsAccessTokenRefresh,
    );
  }
}
