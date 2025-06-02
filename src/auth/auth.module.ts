import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from '../config/jwt.config';
import { MusiModule } from '../musi/musi.module';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guards';
import { MailService } from 'src/mail/mail.service';
import { UrlGeneratorModule } from '../common/url-generator/url-generator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from 'src/refresh-token/refresh-token.entity';
import { RefreshTokenRepository } from 'src/refresh-token/refresh-token.repository';

@Module({
  imports: [
    JwtModule.register({
      privateKey: jwtConstants.privateKey,
      publicKey: jwtConstants.publicKey,
      signOptions: {
        algorithm: 'RS256',
        // expiresIn: '1m',
      },
    }),
    forwardRef(() => MusiModule),
    UrlGeneratorModule,
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, MailService, RefreshTokenRepository],
  exports: [JwtAuthGuard, JwtModule, AuthService],
})
export class AuthModule {}
