import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MailService } from 'src/mail/mail.service';
import { UrlGeneratorService } from '../common/url-generator/url-generator.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [
    UserService,
    MailService,
    UrlGeneratorService,
    {
      provide: UserRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule {}
