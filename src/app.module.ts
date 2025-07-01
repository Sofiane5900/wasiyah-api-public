import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MusiModule } from './musi/musi.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import { AuthModule } from './auth/auth.module';
import { UniqueEntityConstraint } from './common/validator/unique-entity.validator';
import { AppointModule } from './appoint/appoint.module';
import { DeathModule } from './death/death.module';
import { DeclareModule } from './declare/declare.module';
import { DocumentModule } from './document/document.module';
import { LoanModule } from './loan/loan.module';
import { PosthumousMessageModule } from './posthumous-message/posthumous-message.module';
import { RepaymentModule } from './repayment/repayment.module';
import { SafeModule } from './safe/safe.module';
import { TestamentModule } from './testament/testament.module';
import { WakilModule } from './wakil/wakil.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { RefreshTokenMiddleware } from './refresh-token/refresh-token.middleware';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

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
      namingStrategy: new SnakeNamingStrategy(),
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
    MusiModule,
    AuthModule,
    AppointModule,
    DeathModule,
    DeclareModule,
    DocumentModule,
    LoanModule,
    PosthumousMessageModule,
    RepaymentModule,
    SafeModule,
    TestamentModule,
    WakilModule,
    RefreshTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService, UniqueEntityConstraint, RefreshTokenMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RefreshTokenMiddleware)
      .exclude({
        path: 'api/v1/auth/refresh-token/invalidate',
        method: RequestMethod.POST,
      })
      .forRoutes({ path: '/api/v1/*path', method: RequestMethod.ALL });
  }
}
