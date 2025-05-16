import { FastifyRequest } from 'fastify';
import { Musi } from 'src/musi/musi.entity';

export interface RequestWithRefresh extends FastifyRequest {
  user?: Musi;
  needsAccessTokenRefresh?: boolean;
}
