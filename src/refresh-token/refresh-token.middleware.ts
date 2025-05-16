import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepository } from './refresh-token.repository';
import { MusiRepository } from 'src/musi/musi.repository';

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly musiRepository: MusiRepository,
  ) {}

  async use(req: FastifyRequest, res: any, next: () => void) {
    const accessToken = req.cookies?.access_token;
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken || accessToken) {
      return next();
    }

    const storedToken = await this.refreshTokenRepository.findOneBy({
      token: refreshToken,
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      return next();
    }

    const musi = await this.musiRepository.findOneBy({
      email: storedToken.email,
    });
    if (!musi || !musi.isEmailVerified) {
      return next();
    }

    // Inject user and mark token to refresh
    (req as any).user = musi;
    (req as any).needsAccessTokenRefresh = true;

    next();
  }
}
