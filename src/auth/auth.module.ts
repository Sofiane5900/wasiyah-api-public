import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from '../config/jwt.config';
import { UserModule } from '../user/user.module';

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
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
