import { User } from '../user/user.entity';

declare module 'fastify' {
  interface FastifyRequest {
    user?: User;
  }
}
