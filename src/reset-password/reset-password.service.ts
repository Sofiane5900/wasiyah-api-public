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

    const selector = crypto.randomBytes(16).toString('hex');
    const token = crypto.randomBytes(32).toString('base64url');
    const tokenHash = this.createHash(token);
    const urlParam = `${selector}${token}`;

    const resetPassword = Object.assign(new ResetPassword(), {
      musi: musi,
      selector: selector,
      token: tokenHash,
      requestedAt: new Date(),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    await this.resetPasswordRepository.save(resetPassword);
    await this.maileService.sendResetPasswordEmail(email, urlParam);
  }

  async validateResetToken(param: string): Promise<void> {
    const selector = param.slice(0, 32);
    const token = param.slice(32);
    const tokenRequested = await this.resetPasswordRepository.findOneBy({
      selector,
    });

    if (!tokenRequested) {
      throw new NotFoundException('Musi or token not found');
    }

    if (tokenRequested && tokenRequested.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (this.createHash(token) !== tokenRequested.token) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async updatePassword(param: string, plainPassword: string): Promise<void> {
    const selector = param.slice(0, 32);
    const token = param.slice(32);

    const tokenRequested = await this.resetPasswordRepository.findOne({
      where: { selector },
      relations: { musi: true },
    });

    if (!tokenRequested) {
      throw new NotFoundException('Ressource not found');
    }

    const musi: Musi = tokenRequested.musi;

    if (!musi) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (this.createHash(token) !== tokenRequested.token) {
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
    await this.resetPasswordRepository.remove(tokenRequested);
  }

  private createHash(token: string): string {
    return crypto.createHash('sha256').update(token).digest('base64');
  }
}
