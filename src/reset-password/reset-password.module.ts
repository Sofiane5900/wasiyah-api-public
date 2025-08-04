import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ResetPassword } from './reset-password.entity';
import { ResetPasswordRepository } from './reset-password.repository';
import { ResetPasswordController } from './reset-password.controller';
import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { MusiRepository } from '../musi/musi.repository';
import { MailService } from '../mail/mail.service';
import { UrlGeneratorService } from '../common/url-generator/url-generator.service';
import { MusiService } from '../musi/musi.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResetPassword])],
  providers: [
    ResetPasswordService,
    MusiRepository,
    MusiService,
    MailService,
    UrlGeneratorService,
    {
      provide: ResetPasswordRepository,
      useFactory: (dataSource: DataSource) => {
        return new ResetPasswordRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  controllers: [ResetPasswordController],
  exports: [ResetPasswordRepository],
})
export class ResetPasswordModule {}
