import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ResetPasswordRepository } from './reset-password.repository';
import { MusiRepository } from '../musi/musi.repository';
import * as crypto from 'crypto';
import { ResetPassword } from './reset-password.entity';
import { MailService } from '../mail/mail.service';
import * as argon2 from 'argon2';
import { Musi } from '../musi/musi.entity';
import { MusiService } from '../musi/musi.service';
import { UpdateMusiDto } from '../musi/dto/update-musi.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly resetPasswordRepository: ResetPasswordRepository,
    private readonly musiRepository: MusiRepository,
    private readonly musiService: MusiService,
    private readonly maileService: MailService,
  ) {}

  async createResetToken(email: string): Promise<void> {
    const musi = await this.musiRepository.findOneBy({ email });

    if (!musi) {
      return;
    }

    const tokenExists = await this.resetPasswordRepository.findOneBy({ musi });

    if (tokenExists) {
      if (tokenExists.expiresAt > new Date()) {
        return;
      } else {
        await this.resetPasswordRepository.remove(tokenExists);
      }
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex');

    const resetPassword = new ResetPassword();
    resetPassword.musi = musi;
    resetPassword.expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    resetPassword.token = tokenHash;

    await this.resetPasswordRepository.save(resetPassword);
    await this.maileService.sendResetPasswordEmail(email, tokenHash);
  }

  async validateResetToken(token: string): Promise<void> {
    const tokenExists = await this.resetPasswordRepository.findOneBy({ token });

    if (!tokenExists) {
      throw new NotFoundException('Musi or token not found');
    }

    if (tokenExists && tokenExists.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async updatePassword(token: string, plainPassword: string): Promise<void> {
    const tokenExists = await this.resetPasswordRepository.findOne({
      where: { token },
      relations: { musi: true },
    });

    if (!tokenExists) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const musi: Musi = tokenExists.musi;

    if (!musi) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const updateDto = plainToInstance(UpdateMusiDto, {
      password: plainPassword,
    });

    const errors = await validate(updateDto);
    if (errors.length > 0) {
      throw new UnprocessableEntityException(
        errors.flatMap((error) => Object.values(error.constraints || {})),
      );
    }

    const passwordHash = await argon2.hash(plainPassword);

    await this.musiService.update(musi.id, { password: passwordHash });
    await this.resetPasswordRepository.remove(tokenExists);
  }
}
