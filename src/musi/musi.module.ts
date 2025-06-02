import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musi } from './musi.entity';
import { MusiService } from './musi.service';
import { MusiController } from './musi.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MailService } from 'src/mail/mail.service';
import { UrlGeneratorService } from '../common/url-generator/url-generator.service';
import { MusiRepository } from './musi.repository';
import { DataSource } from 'typeorm';
import { RefreshTokenRepository } from 'src/refresh-token/refresh-token.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Musi]), forwardRef(() => AuthModule)],
  providers: [
    MusiService,
    MailService,
    UrlGeneratorService,
    {
      provide: RefreshTokenRepository,
      useFactory: (dataSource: DataSource) => {
        return new RefreshTokenRepository(dataSource);
      },
      inject: [DataSource],
    },

    {
      provide: MusiRepository,
      useFactory: (dataSource: DataSource) => {
        return new MusiRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  controllers: [MusiController],
  exports: [MusiService, MusiRepository, RefreshTokenRepository],
})
export class MusiModule {}
