import { describe, it, beforeEach, expect, vi } from 'vitest';
import {ResetPasswordService} from "../../src/reset-password/reset-password.service";
import { UnauthorizedException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import * as crypto from 'crypto';
import * as argon2 from 'argon2';

vi.mock('argon2');

describe('ResetPasswordService', () => {
  let service: ResetPasswordService;
  let resetPasswordRepository: any;
  let musiRepository: any;
  let musiService: any;
  let mailService: any;

  beforeEach(() => {
    resetPasswordRepository = {
      findOneBy: vi.fn(),
      save: vi.fn(),
      remove: vi.fn(),
      findOne: vi.fn(),
    };

    musiRepository = {
      findOneBy: vi.fn(),
    };

    musiService = {
      update: vi.fn(),
    };

    mailService = {
      sendResetPasswordEmail: vi.fn(),
    };

    service = new ResetPasswordService(
      resetPasswordRepository,
      musiRepository,
      musiService,
      mailService,
    );
  });

  describe('createResetToken', () => {
    it('should do nothing if no musi is found', async () => {
      musiRepository.findOneBy.mockResolvedValue(null);
      await service.createResetToken('test@example.com');
      expect(resetPasswordRepository.findOneBy).not.toHaveBeenCalled();
    });

    it('should return early if token is still valid', async () => {
      const now = new Date();
      const musi = { id: 1, email: 'test@example.com' };
      const tokenExists = {
        expiresAt: new Date(now.getTime() + 1000 * 60),
      };

      musiRepository.findOneBy.mockResolvedValue(musi);
      resetPasswordRepository.findOneBy.mockResolvedValue(tokenExists);

      await service.createResetToken('test@example.com');
      expect(resetPasswordRepository.remove).not.toHaveBeenCalled();
    });

    it('should remove expired token and create a new one', async () => {
      const musi = { id: 1, email: 'test@example.com' };
      const expiredToken = {
        expiresAt: new Date(Date.now() - 1000),
      };

      musiRepository.findOneBy.mockResolvedValue(musi);
      resetPasswordRepository.findOneBy.mockResolvedValue(expiredToken);
      resetPasswordRepository.remove.mockResolvedValue(null);
      resetPasswordRepository.save.mockResolvedValue({});
      mailService.sendResetPasswordEmail.mockResolvedValue(null);

      await service.createResetToken('test@example.com');

      expect(resetPasswordRepository.remove).toHaveBeenCalledWith(expiredToken);
      expect(resetPasswordRepository.save).toHaveBeenCalled();
      expect(mailService.sendResetPasswordEmail).toHaveBeenCalled();
    });
  });

  describe('validateResetToken', () => {
    it('should throw NotFound if token not found', async () => {
      resetPasswordRepository.findOneBy.mockResolvedValue(null);
      await expect(service.validateResetToken('invalid')).rejects.toThrow(NotFoundException);
    });

    it('should throw Unauthorized if token expired', async () => {
      const expired = { expiresAt: new Date(Date.now() - 1000) };
      resetPasswordRepository.findOneBy.mockResolvedValue(expired);
      await expect(service.validateResetToken('expired')).rejects.toThrow(UnauthorizedException);
    });

    it('should pass if token is valid', async () => {
      const valid = { expiresAt: new Date(Date.now() + 1000 * 60) };
      resetPasswordRepository.findOneBy.mockResolvedValue(valid);
      await expect(service.validateResetToken('valid')).resolves.toBeUndefined();
    });
  });

  describe('updatePassword', () => {
    it('should throw Unauthorized if token not found', async () => {
      resetPasswordRepository.findOne.mockResolvedValue(null);
      await expect(service.updatePassword('fake', 'pass')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw Unauthorized if musi not found on token', async () => {
      resetPasswordRepository.findOne.mockResolvedValue({ musi: null });
      await expect(service.updatePassword('fake', 'pass')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnprocessableEntity if password invalid', async () => {
      resetPasswordRepository.findOne.mockResolvedValue({
        musi: { id: 1 },
      });

      vi.mocked(argon2.hash).mockResolvedValue('hashedPassword');
      const oldValidate = (await import('class-validator')).validate;
      vi.spyOn(await import('class-validator'), 'validate').mockResolvedValue([
        {
          constraints: {length: 'password too short'},
          property: 'password'
        },
      ]);

      await expect(service.updatePassword('token', 'bad')).rejects.toThrow(UnprocessableEntityException);
    });

    it('should update password and remove token', async () => {
      const musi = { id: 1 };
      const token = { musi };

      resetPasswordRepository.findOne.mockResolvedValue(token);
      musiService.update.mockResolvedValue(null);
      resetPasswordRepository.remove.mockResolvedValue(null);

      vi.mocked(argon2.hash).mockResolvedValue('hashedPassword');
      vi.spyOn(await import('class-validator'), 'validate').mockResolvedValue([]);

      await service.updatePassword('token', 'strongpassword');

      expect(argon2.hash).toHaveBeenCalled();
      expect(musiService.update).toHaveBeenCalledWith(musi.id, {
        password: 'hashedPassword',
      });
      expect(resetPasswordRepository.remove).toHaveBeenCalledWith(token);
    });
  });
});
