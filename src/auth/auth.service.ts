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
import { RefreshTokenRepository } from 'src/refresh-token/refresh-token.repository';
import { Musi } from 'src/musi/musi.entity';
import { randomBytes } from 'crypto';

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
    private readonly refreshTokenRepository: RefreshTokenRepository,
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
    // "safeMusi" does not contain the password.
    // We name it "safe" to distinguish it from the full Musi entity.
    const safeMusi = await this.validateUser(email, password);
    if (!safeMusi || !safeMusi.isEmailVerified) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign(
      {
        sub: safeMusi.id,
        email: safeMusi.email,
        roles: safeMusi.roles,
      },
      {
        expiresIn: '15m',
      },
    );

    const musi = await this.musiRepository.findOneBy({ email });
    if (!musi) {
      throw new NotFoundException('Musi not found.');
    }
    const refreshToken = await this.createRefreshToken(musi);

    reply.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'strict',
      path: '/',
      expires: new Date(Date.now() + 1000 * 60),
    });

    reply.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'strict',
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      domain: undefined,
    });

    reply.send({ accessToken });
  }

  async logout(refreshToken: string, reply: FastifyReply): Promise<void> {
    await this.refreshTokenRepository.delete({ token: refreshToken });
    console.log(process.env.NODE_ENV, 'process.env.NODE_ENV');
    reply.clearCookie('refresh-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'strict',
      path: '/',
    });

    reply.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'strict',
      path: '/',
    });

    reply.send({
      message: 'Logged out successfully',
    });
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
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async createRefreshToken(musi: Musi): Promise<string> {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.refreshTokenRepository.save({
      user: musi,
      email: musi.email,
      token,
      expiresAt,
    });

    return token;
  }

  async refreshAcessToken(refreshToken: string | undefined) {
    const storedToken = await this.refreshTokenRepository.findOneBy({
      token: refreshToken,
    });
    console.log(storedToken, 'storedToken');

    if (!storedToken) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (storedToken.expiresAt < new Date()) {
      await this.refreshTokenRepository.delete({ token: refreshToken });
      throw new UnauthorizedException('Invalid credentials');
    }

    const musi = await this.musiRepository.findOneBy({
      email: storedToken.email,
    });
    if (!musi || !musi.isEmailVerified) {
      throw new UnauthorizedException('Musi not found or not verified');
    }

    const accessToken = this.jwtService.sign({
      sub: musi.id,
      email: musi.email,
      roles: musi.roles,
    });

    return {
      accessToken,
    };
  }
}
