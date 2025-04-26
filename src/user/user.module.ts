import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MailService } from 'src/mail/mail.service';
import { UrlGeneratorService } from '../common/url-generator/url-generator.service';
import { TestamentModule } from 'src/testament/testament.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    TestamentModule,
  ],
  providers: [UserService, MailService, UrlGeneratorService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
