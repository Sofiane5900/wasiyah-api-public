import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musi } from './musi.entity';
import { UserService } from './musi.service';
import { UserController } from './musi.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MailService } from 'src/mail/mail.service';
import { UrlGeneratorService } from '../common/url-generator/url-generator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Musi]), forwardRef(() => AuthModule)],
  providers: [UserService, MailService, UrlGeneratorService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
