import {
  Injectable,
  InternalServerErrorException,
  Optional,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UrlGeneratorService } from '../common/url-generator/url-generator.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly urlGeneratorService: UrlGeneratorService,
    @Optional() private readonly jwtService: JwtService,
  ) {}

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        from: process.env.FROM_EMAIL || 'no-reply@example.org',
        to,
        subject,
        html,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async sendVerificationEmail(email: string): Promise<void> {
    const token = this.jwtService.sign({ email: email }, { expiresIn: '15m' });

    const link = this.urlGeneratorService.generateAbsolute(
      'auth/verify-email?token=' + token,
    );

    const subject = 'Verify your email address';
    const html = `<p>Click here to verify your account :</p><a href="${link}">${link}</a>`;
    await this.sendEmail(email, subject, html);
  }

  async sendResetPasswordEmail(email: string, param: string): Promise<void> {
    const link = this.urlGeneratorService.generateAbsolute(
      'reset-password/validate/' + param,
    );

    const subject = 'Reset your password';
    const html = `<p>Click here to reset your password :</p><a href="${link}">${link}</a>`;
    await this.sendEmail(email, subject, html);
  }
}
