import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
    });
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.FROM_EMAIL!,
      to,
      subject,
      html,
    });
  }

  async sendVerificationEmail(to: string, link: string): Promise<void> {
    const subject = 'Verify your email address';
    const html = `p>Click here to verify your account :</p><a href="${link}">${link}</a>`;
    return this.sendEmail(to, subject, html);
  }
}
