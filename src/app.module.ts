import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import { AuthModule } from './auth/auth.module';

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
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
