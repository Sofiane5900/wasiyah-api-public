import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UrlGeneratorService } from '../common/url-generator/url-generator.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly urlGeneratorService: UrlGeneratorService,
    private readonly jwtService: JwtService,
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
}
