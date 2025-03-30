import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder, SwaggerCustomOptions} from '@nestjs/swagger';
import * as process from "node:process";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = new ConfigService();
  const env = configService.get<string>('NODE_ENV');

  const config = new DocumentBuilder()
      .setTitle('Wasiyah API')
      .setDescription('Wasiyah API documentation')
      .setVersion('1.0')
      .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    ui: env !== 'PROD',
    raw: ['json'],
  };

  SwaggerModule.setup('api', app, documentFactory, options);

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
