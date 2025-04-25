import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import { AuthModule } from './auth/auth.module';
import { UniqueEntityConstraint } from './common/validator/unique-entity.validator';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'database_user',
      password: 'database_pass',
      database:
        process.env.NODE_ENV !== 'test' ? 'wasiyah_db' : 'wasiyah_db_test',
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/**/*.{ts,js}'],
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST || 'mailer',
        port: Number(process.env.SMTP_PORT) || 1025,
        auth: process.env.SMTP_USER
          ? {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            }
          : undefined,
      },
      preview: true,
      template: {},
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UniqueEntityConstraint],
})
export class AppModule {}
