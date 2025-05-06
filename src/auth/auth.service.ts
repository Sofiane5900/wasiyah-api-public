import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyReply } from 'fastify';
import * as argon2 from 'argon2';
import { RoleUser } from 'src/enum/Roles';
import { MusiRepository } from '../musi/musi.repository';

interface SafeMusi {
  id: string;
  email: string;
  roles: RoleUser;
  isEmailVerified: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly musiRepository: MusiRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<SafeMusi | null> {
    const musi = await this.musiRepository.findOneBy({ email });
    if (!musi) return null;

    const isPasswordValid = await argon2.verify(musi.password, password);
    if (!isPasswordValid) return null;

    const { id, email: musiEmail, roles } = musi;
    return {
      id,
      email: musiEmail,
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
      const musi = await this.musiRepository.findOneBy({
        email: payload.email,
      });

      if (!musi) {
        throw new NotFoundException('User not found');
      }

      if (musi.isEmailVerified) {
        throw new ConflictException('Email is already verified');
      }

      musi.isEmailVerified = true;
      await this.musiRepository.update(musi.id, musi);

      return { message: 'Email verified with success!' };
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
