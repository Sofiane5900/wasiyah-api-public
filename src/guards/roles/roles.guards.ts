import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Musi } from '../../musi/musi.entity';
import { FastifyRequest } from 'fastify';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /**
   * @param context {ExecutionContext}
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const user = request.user as Musi;

    if (!user?.roles?.length) {
      return false;
    }

    return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}
