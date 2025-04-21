import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyReply } from 'fastify';
import * as argon2 from 'argon2';
import { UserRepository } from '../user/user.repository';

interface SafeUser {
  id: number;
  email: string;
  roles: string[];
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<SafeUser | null> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) return null;

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) return null;

    const { id, email: userEmail, roles } = user;
    return { id, email: userEmail, roles };
  }

  async login(
    email: string,
    password: string,
    reply: FastifyReply,
  ): Promise<void> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      roles: user.roles,
    });

    reply.setCookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'strict',
      path: '/',
    });

    reply.send({ token });
  }
}
