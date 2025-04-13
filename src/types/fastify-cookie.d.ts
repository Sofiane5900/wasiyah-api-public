import 'fastify';

declare module 'fastify' {
  interface FastifyReply {
    setCookie: (
      name: string,
      value: string,
      options?: import('@fastify/cookie').CookieSerializeOptions,
    ) => FastifyReply;
  }
}
