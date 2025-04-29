import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MusiService } from '../musi/musi.service';
import { FastifyReply } from 'fastify';
import * as argon2 from 'argon2';
import { RoleUser } from 'src/enum/Roles';

interface SafeUser {
  id: string;
  email: string;
  roles: RoleUser;
  isEmailVerified: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly musiService: MusiService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<SafeUser | null> {
    const musi = await this.musiService.findByEmail(email);
    if (!musi) return null;

    const isPasswordValid = await argon2.verify(musi.password, password);
    if (!isPasswordValid) return null;

    const { id, email: userEmail, roles } = musi;
    return {
      id,
      email: userEmail,
      roles,
      isEmailVerified: musi.isEmailVerified,
    };
  }

  async login(
    email: string,
    password: string,
    reply: FastifyReply,
  ): Promise<void> {
    const musi = await this.validateUser(email, password);
    if (!musi || !musi.isEmailVerified) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: musi.id,
      email: musi.email,
      roles: musi.roles,
    });

    reply.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'strict',
      path: '/',
    });

    reply.send({ token });
  }

  async verifyEmail(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<{ email: string }>(
        token,
      );
      const musi = await this.musiService.findByEmail(payload.email);

      if (!musi) {
        throw new NotFoundException('User not found');
      }

      if (musi.isEmailVerified) {
        throw new ConflictException('Email is already verified');
      }

      musi.isEmailVerified = true;
      await this.musiService.update(musi.id, musi);

      return { message: 'Email verified with success!' };
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
