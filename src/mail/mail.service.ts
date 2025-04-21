import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UrlGeneratorService } from '../common/service/url-generator.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly urlGeneratorService: UrlGeneratorService,
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

  async sendVerificationEmail(to: string, token: string): Promise<void> {
    const link = this.urlGeneratorService.generateAbsolute(
      'verify-email/:token',
      { token: token },
    );
    const subject = 'Verify your email address';
    const html = `<p>Click here to verify your account :</p><a href="${link}">${link}</a>`;
    await this.sendEmail(to, subject, html);
  }
}
