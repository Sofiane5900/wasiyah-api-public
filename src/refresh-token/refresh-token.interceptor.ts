import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { tap } from 'rxjs/operators';
import { Musi } from 'src/musi/musi.entity';
import { RequestWithRefresh } from './request-refresh.interface';

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();

    return next.handle().pipe(
      tap(() => {
        const needsRefresh = (request as RequestWithRefresh)
          .needsAccessTokenRefresh;
        const musi = (request as any).user as Musi | undefined;

        if (needsRefresh && musi) {
          const newAccessToken = this.jwtService.sign(
            {
              sub: musi.id,
              email: musi.email,
              roles: musi.roles,
            },
            {
              algorithm: 'RS256',
              expiresIn: '1h',
            },
          );

          response.cookie('access_token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod',
            sameSite: 'strict',
            path: '/',
          });
        }
      }),
    );
  }
}
