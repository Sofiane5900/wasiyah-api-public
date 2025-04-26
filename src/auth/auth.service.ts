import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
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
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<SafeUser | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) return null;

    const { id, email: userEmail, roles } = user;
    return {
      id,
      email: userEmail,
      roles,
      isEmailVerified: user.isEmailVerified,
    };
  }

  async login(
    email: string,
    password: string,
    reply: FastifyReply,
  ): Promise<void> {
    const user = await this.validateUser(email, password);
    if (!user || !user.isEmailVerified) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      roles: user.roles,
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
      const user = await this.userService.findByEmail(payload.email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user.isEmailVerified) {
        throw new ConflictException('Email is already verified');
      }

      user.isEmailVerified = true;
      await this.userService.update(user.id, user);

      return { message: 'Email verified with success!' };
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
