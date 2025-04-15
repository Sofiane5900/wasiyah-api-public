import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from '../config/jwt.config';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.gards';

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
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [JwtAuthGuard, JwtModule],
})
export class AuthModule {}
