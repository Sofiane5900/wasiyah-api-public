import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { Musi } from '../../musi/musi.entity';
import { RoleUser } from 'src/enum/Roles';
import { AuthService } from '../../auth/auth.service';
import { FastifyReply } from 'fastify';
import { RefreshTokenRepository } from 'src/refresh-token/refresh-token.repository';

interface JwtPayload {
  sub: string;
  email: string;
  roles: RoleUser;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly refresh: RefreshTokenRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const reply = context.switchToHttp().getResponse<FastifyReply>();
    const refreshTokenId = request.cookies?.refresh_token;
    const accessToken = request.cookies?.access_token;

    try {
      // Case 1: No access token, try with the refresh token
      if (!accessToken) {
        return await this.handleMissingAccessToken(
          refreshTokenId,
          request,
          reply,
        );
      }

      // Case 2: Access token present, verify it
      try {
        const payload = await this.jwtService.verifyAsync<JwtPayload>(
          accessToken,
          {
            algorithms: ['RS256'],
          },
        );

        // Token is valid, still generate a new token for this request
        const newAccessToken = this.generateNewAccessToken(payload, reply);

        if (newAccessToken) {
          // Update the user in the request
          request.user = {
            id: String(payload.sub),
            email: payload.email,
            roles: payload.roles,
          } as Musi;

          return true;
        }
      } catch (jwtError) {
        console.log(
          'Access token invalid or expired, trying with refresh token',
          jwtError.message,
        );
        // Invalid/expired token, try with the refresh token
        return await this.handleMissingAccessToken(
          refreshTokenId,
          request,
          reply,
        );
      }
    } catch (error) {
      throw new UnauthorizedException('Authentication error', error.message);
    }

    return false;
  }

  private async handleMissingAccessToken(
    refreshTokenId: string | undefined,
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<boolean> {
    if (!refreshTokenId) {
      throw new UnauthorizedException('No authentication token provided');
    }

    try {
      // Look for the refresh token in the database
      const refreshTokenData = await this.refresh.findOneBy({
        token: refreshTokenId,
      });

      if (!refreshTokenData) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newAccessToken = this.jwtService.sign(
        {
          sub: refreshTokenData.id,
          email: refreshTokenData.email,
          roles: RoleUser.ROLE_MUSI, // You may want to get the role from refreshTokenData
        },
        {
          expiresIn: '1m',
          algorithm: 'RS256', // Add algorithm for consistency
        },
      );

      // Set the cookie with the new token
      reply.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
        sameSite: 'strict',
        maxAge: 5 * 60 * 1000, // 5 minutes in milliseconds
      });

      // Update the user in the request
      request.user = {
        id: String(refreshTokenData.id),
        email: refreshTokenData.email,
        roles: RoleUser.ROLE_MUSI,
      } as Musi;

      return true;
    } catch (err) {
      throw new UnauthorizedException(
        err instanceof Error ? err.message : 'Authentication error',
      );
    }
  }

  private generateNewAccessToken(
    payload: JwtPayload,
    reply: FastifyReply,
  ): boolean {
    try {
      const newAccessToken = this.jwtService.sign(
        {
          sub: payload.sub,
          email: payload.email,
          roles: payload.roles,
        },
        {
          expiresIn: '1m',
          algorithm: 'RS256',
        },
      );
      // delete cookie existant and new cookie each request
      reply.clearCookie('access_token');

      reply.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
        sameSite: 'strict',
        maxAge: 5 * 60 * 1000,
      });

      return true;
    } catch (error) {
      console.error('Error while generating new token:', error);
      return false;
    }
  }
}
