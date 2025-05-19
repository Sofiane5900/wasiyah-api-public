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

interface JwtPayload {
  sub: string;
  email: string;
  roles: RoleUser;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * @param context {ExecutionContext}
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    // Si l'utilisateur est déjà défini par le RefreshTokenMiddleware, permettre l'accès
    if (request.user) {
      return true;
    }

    const token = request.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException('No token found in cookies');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        algorithms: ['RS256'],
      });

      request.user = {
        id: String(payload.sub),
        email: payload.email,
        roles: payload.roles,
      } as Musi;

      return true;
    } catch (err) {
      // Si le token est expiré, mais que nous avons un needsAccessTokenRefresh défini par le middleware
      if ((request as any).needsAccessTokenRefresh) {
        // Le middleware a déjà configuré l'utilisateur et a indiqué qu'un refresh est nécessaire
        // L'intercepteur s'occupera de générer un nouveau token après cette route
        return true;
      }

      console.error(err);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
