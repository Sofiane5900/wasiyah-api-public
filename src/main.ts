import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filter/filter-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Wasiyah API')
    .setDescription('Wasiyah API documentation')
    .setVersion('1.0')
    .addTag('users')
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
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
