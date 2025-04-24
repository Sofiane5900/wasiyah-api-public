import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from '../config/jwt.config';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guards';
import { MailService } from 'src/mail/mail.service';
import { UrlGeneratorModule } from '../common/url-generator/url-generator.module';

@Module({
  imports: [
    JwtModule.register({
      privateKey: jwtConstants.privateKey,
      publicKey: jwtConstants.publicKey,
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '1h',
      },
    }),
    forwardRef(() => UserModule),
    UrlGeneratorModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, MailService],
  exports: [JwtAuthGuard, JwtModule],
})
export class AuthModule {}
