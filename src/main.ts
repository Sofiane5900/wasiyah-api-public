import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filter/filter-exception';
import { useContainer } from 'class-validator';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const adapter = new FastifyAdapter({
    logger: process.env.NODE_ENV !== 'prod',
  });

  await adapter.register(fastifyCookie);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  const config = new DocumentBuilder()
    .setTitle('Wasiyah API')
    .setDescription('Wasiyah API documentation')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    ui: process.env.NODE_ENV !== 'prod',
    raw: ['json'],
  };

  SwaggerModule.setup('api', app, documentFactory, options);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 8000, '0.0.0.0');
}
bootstrap();
