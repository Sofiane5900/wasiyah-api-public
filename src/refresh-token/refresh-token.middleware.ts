import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
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
    const cookies = this.parseCookies(req.headers.cookie);
    if (!cookies) {
      throw new UnauthorizedException('Bad request');
    }

    const { access_token: accessToken, refresh_token: refreshToken } = cookies;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    const { isPresent, isExpired } = this.validateAccessToken(accessToken);

    // Si le token d'accès est présent et valide, continuer
    if (isPresent && !isExpired) {
      return next();
    }

    const isValidRefreshToken = await this.validateRefreshToken(refreshToken);
    if (!isValidRefreshToken) {
      this.clearAuthCookies(res);
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }

    const musi = await this.getUserFromRefreshToken(refreshToken);
    if (!musi) {
      throw new UnauthorizedException('User not found or email not verified');
    }

    req.user = musi;
    req.needsAccessTokenRefresh = true;
    req.refreshToken = refreshToken;

    next();
  }

  private parseCookies(cookieHeader?: string): CookieMap | null {
    if (!cookieHeader) {
      return null;
    }

    return Object.fromEntries(
      cookieHeader.split('; ').map((cookie) => {
        const [key, ...valueParts] = cookie.split('=');
        return [key, valueParts.join('=')];
      }),
    );
  }

  private validateAccessToken(accessToken?: string): {
    isPresent: boolean;
    isExpired: boolean;
  } {
    if (!accessToken) {
      return { isPresent: false, isExpired: true };
    }

    try {
      const decodedToken = this.jwtService.decode(accessToken);

      if (!this.isValidTokenPayload(decodedToken)) {
        return { isPresent: true, isExpired: true };
      }

      const expirationDate = new Date(decodedToken.exp * 1000);
      const isExpired = expirationDate <= new Date();

      return { isPresent: true, isExpired };
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return { isPresent: true, isExpired: true };
    }
  }

  private isValidTokenPayload(token: any): token is { exp: number } {
    return token && typeof token === 'object' && typeof token.exp === 'number';
  }

  private async validateRefreshToken(refreshToken: string): Promise<boolean> {
    const storedToken = await this.refreshTokenRepository.findOneBy({
      token: refreshToken,
    });

    return storedToken !== null && storedToken.expiresAt >= new Date();
  }

  private async getUserFromRefreshToken(refreshToken: string) {
    const storedToken = await this.refreshTokenRepository.findOneBy({
      token: refreshToken,
    });

    if (!storedToken) {
      return null;
    }

    const musi = await this.musiRepository.findOneBy({
      email: storedToken.email,
    });

    return musi?.isEmailVerified ? musi : null;
  }

  private clearAuthCookies(res: FastifyReply): void {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }
}
