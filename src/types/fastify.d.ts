import { User } from '../musi/musi.entity';

declare module 'fastify' {
  interface FastifyRequest {
    user?: User;
  }
}
