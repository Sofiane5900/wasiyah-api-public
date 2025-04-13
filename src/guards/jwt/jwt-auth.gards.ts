import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { User } from '../../user/user.entity';

interface JwtPayload {
  sub: string;
  email: string;
  roles: string[];
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * @param context {ExecutionContext}
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const token = request.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException('No token found in cookies');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        algorithms: ['RS256'],
      });

      request.user = {
        id: Number(payload.sub), // Conversion explicite de 'sub' en number
        email: payload.email,
        roles: payload.roles,
      } as User;

      return true;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
