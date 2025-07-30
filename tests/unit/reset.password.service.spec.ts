import { describe, it, expect, vi, beforeEach } from 'vitest';
import {ResetPasswordService} from "../../src/reset-password/reset-password.service";
import {ResetPasswordRepository} from "../../src/reset-password/reset-password.repository";
import {MusiRepository} from "../../src/musi/musi.repository";
import {MailService} from "../../src/mail/mail.service";
import {MusiService} from "../../src/musi/musi.service";
import * as argon2 from 'argon2';
import * as crypto from 'crypto';

vi.mock('argon2');

describe('ResetPasswordService', () => {
  let service: ResetPasswordService;
  let resetPasswordRepository: ResetPasswordRepository;
  let musiRepository: MusiRepository;
  let mailService: MailService;
  let musiService: MusiService;

  beforeEach(() => {
    resetPasswordRepository = {
      findOneBy: vi.fn(),
      save: vi.fn(),
      remove: vi.fn(),
      findOne: vi.fn(),
    } as any;

    musiRepository = {
      findOneBy: vi.fn(),
    } as any;

    mailService = {
      sendResetPasswordEmail: vi.fn(),
    } as any;

    musiService = {
      update: vi.fn(),
    } as any;

    service = new ResetPasswordService(
      resetPasswordRepository,
      musiRepository,
      musiService,
      mailService
    );
  });

  describe('createResetToken', () => {
    it('should do nothing if musi not found', async () => {
      vi.spyOn(musiRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.createResetToken('test@example.com')).resolves.toBeUndefined();
      expect(resetPasswordRepository.save).not.toHaveBeenCalled();
    });

    it('should return if token not expired yet', async () => {
      const musi = { id: 1 };
      const selector = 'a'.repeat(32);
      const fakeToken = {
        selector: selector,
        expiresAt: new Date(Date.now() + 1000)
      };
      vi.spyOn(musiRepository, 'findOneBy').mockResolvedValue(musi);
      vi.spyOn(resetPasswordRepository, 'findOneBy').mockResolvedValue(fakeToken);

      await service.createResetToken('test@example.com');
      expect(resetPasswordRepository.save).not.toHaveBeenCalled();
    });

    it('should save and send email if valid', async () => {
      const musi = { id: 1 };
      vi.spyOn(musiRepository, 'findOneBy').mockResolvedValue(musi);
      vi.spyOn(resetPasswordRepository, 'findOneBy').mockResolvedValue(null);

      await service.createResetToken('test@example.com');

      expect(resetPasswordRepository.save).toHaveBeenCalled();
      expect(mailService.sendResetPasswordEmail).toHaveBeenCalled();
    });
  });

  describe('validateResetToken', () => {
    it('should throw NotFound if token not found', async () => {
      vi.spyOn(resetPasswordRepository, 'findOneBy').mockResolvedValue(null);
      await expect(service.validateResetToken('abc123')).rejects.toThrow('Musi or token not found');
    });

    it('should throw Unauthorized if token expired', async () => {
      const selector = 'a'.repeat(64);
      const fakeToken = {
        selector: selector,
        expiresAt: new Date(Date.now() - 1000),
      };
      vi.spyOn(resetPasswordRepository, 'findOneBy').mockResolvedValue(fakeToken);

      await expect(service.validateResetToken('abc123')).rejects.toThrow('Invalid credentials');
    });

    it('should throw Unauthorized if token hash doesn’t match', async () => {
      const selector = 'a'.repeat(32)
      const token = 'b'.repeat(64)
      const fakeToken = {
        expiresAt: new Date(Date.now() + 10000),
        token: 'invalidhash',
      };
      vi.spyOn(resetPasswordRepository, 'findOneBy').mockResolvedValue(fakeToken);

      await expect(service.validateResetToken(selector + token)).rejects.toThrow('Invalid credentials');
    });

    it('should succeed if token valid', async () => {
      const selector = 'a'.repeat(32);
      const token = 'b'.repeat(64);
      const tokenHash = crypto.createHash('sha256').update(token).digest('base64');

      const fakeToken = {
        expiresAt: new Date(Date.now() + 10000),
        selector: selector,
        token: tokenHash,
      };
      vi.spyOn(resetPasswordRepository, 'findOneBy').mockResolvedValue(fakeToken);

      await expect(service.validateResetToken(selector + token)).resolves.toBeUndefined();
    });
  });

  describe('updatePassword', () => {
    it('should throw NotFound if token not found', async () => {
      vi.spyOn(resetPasswordRepository, 'findOne').mockResolvedValue(null);
      await expect(service.updatePassword('abc123', 'newPassword')).rejects.toThrow('Ressource not found');
    });

    it('should throw Unauthorized if musi missing', async () => {
      const tokenData = {
        musi: null,
      };
      vi.spyOn(resetPasswordRepository, 'findOne').mockResolvedValue(tokenData);
      await expect(service.updatePassword('abc123', 'newPassword')).rejects.toThrow('Invalid credentials');
    });

    it('should throw Unauthorized if token mismatch', async () => {
      const selector = 'a'.repeat(32);
      const token = 'b'.repeat(64);
      const tokenData = {
        musi: { id: 1 },
        token: 'invalidHash',
      };
      vi.spyOn(resetPasswordRepository, 'findOne').mockResolvedValue(tokenData);

      await expect(service.updatePassword(selector + token, 'newPassword')).rejects.toThrow('Invalid credentials');
    });

    it('should update password and remove token if valid', async () => {
      const selector = 'a'.repeat(32);
      const token = 'b'.repeat(64);
      const tokenHash = crypto.createHash('sha256').update(token).digest('base64');

      const tokenData = {
        musi: { id: 1 },
        selector: selector,
        token: tokenHash,
      };
      vi.spyOn(resetPasswordRepository, 'findOne').mockResolvedValue(tokenData);
      vi.spyOn(argon2, 'hash').mockResolvedValue('hashedPassword');

      await service.updatePassword(selector + token, 'newPassword!123456');

      expect(musiService.update).toHaveBeenCalledWith(1, { password: 'hashedPassword' });
      expect(resetPasswordRepository.remove).toHaveBeenCalled();
    });
  });
});
