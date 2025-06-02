import { AuthService } from '../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MusiRepository } from '../../src/musi/musi.repository';
import { RefreshTokenRepository } from '../../src/refresh-token/refresh-token.repository';
import {
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { RoleUser } from '../../src/enum/Roles';
import { Musi } from '../../src/musi/musi.entity';
import { RefreshToken } from '../../src/refresh-token/refresh-token.entity';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as argon2 from 'argon2';

vi.mock('argon2', () => ({
  verify: vi.fn().mockResolvedValue(true),
}));

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let musiRepository: MusiRepository;
  let refreshTokenRepository: RefreshTokenRepository;
  let mockReply: FastifyReply;

  const mockMusi: Partial<Musi> = {
    id: '1',
    email: 'test@example.com',
    password: 'hashedPassword',
    roles: RoleUser.ROLE_MUSI,
    isEmailVerified: true,
  };

  const mockRefreshToken: Partial<RefreshToken> = {
    id: '1',
    token: 'valid-refresh-token',
    email: 'test@example.com',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  };

  beforeEach(() => {
    musiRepository = {
      findOneBy: vi.fn(),
      update: vi.fn(),
    } as unknown as MusiRepository;

    jwtService = {
      sign: vi.fn().mockReturnValue('new-access-token'),
      verifyAsync: vi.fn(),
    } as unknown as JwtService;

    refreshTokenRepository = {
      findOneBy: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
    } as unknown as RefreshTokenRepository;

    service = new AuthService(
      musiRepository,
      jwtService,
      refreshTokenRepository,
    );

    mockReply = {
      cookie: vi.fn(),
      send: vi.fn(),
      clearCookie: vi.fn(),
    } as unknown as FastifyReply;

    vi.clearAllMocks();
  });

  describe('validateUser', () => {
    it('devrait retourner les informations utilisateur si les identifiants sont valides', async () => {
      musiRepository.findOneBy = vi.fn().mockResolvedValue(mockMusi);

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toEqual({
        id: '1',
        email: 'test@example.com',
        roles: RoleUser.ROLE_MUSI,
        isEmailVerified: true,
      });
    });

    it("devrait retourner null si l'utilisateur n'existe pas", async () => {
      musiRepository.findOneBy = vi.fn().mockResolvedValue(null);

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toBeNull();
    });

    it('devrait retourner null si le mot de passe est invalide', async () => {
      musiRepository.findOneBy = vi.fn().mockResolvedValue(mockMusi);
      vi.spyOn(argon2, 'verify').mockResolvedValue(false);

      const result = await service.validateUser(
        'test@example.com',
        'wrong-password',
      );

      expect(result).toBeNull();
    });
  });

  // describe('login', () => {
  //   it("devrait connecter l'utilisateur avec succès", async () => {
  //     musiRepository.findOneBy = vi.fn().mockResolvedValue(mockMusi);
  //     refreshTokenRepository.save = vi.fn().mockResolvedValue(mockRefreshToken);

  //     await service.login('test@example.com', 'password', mockReply);

  //     const cookieSpy = vi.spyOn(mockReply, 'cookie');
  //     const sendSpy = vi.spyOn(mockReply, 'send');
  //     expect(cookieSpy).toHaveBeenCalledTimes(2);
  //     expect(sendSpy).toHaveBeenCalledWith({
  //       accessToken: 'new-access-token',
  //     });
  //   });

  //   it('devrait lever une exception si les identifiants sont invalides', async () => {
  //     musiRepository.findOneBy = vi.fn().mockResolvedValue(null);

  //     await expect(
  //       service.login('test@example.com', 'password', mockReply),
  //     ).rejects.toThrow(UnauthorizedException);
  //   });

  //   it("devrait lever une exception si l'email n'est pas vérifié", async () => {
  //     musiRepository.findOneBy = vi
  //       .fn()
  //       .mockResolvedValue({ ...mockMusi, isEmailVerified: false });

  //     await expect(
  //       service.login('test@example.com', 'password', mockReply),
  //     ).rejects.toThrow(UnauthorizedException);
  //   });
  // });

  // describe('logout', () => {
  //   it("devrait déconnecter l'utilisateur avec succès", async () => {
  //     await service.logout('valid-refresh-token', mockReply);

  //     const deleteSpy = vi.spyOn(refreshTokenRepository, 'delete');
  //     const clearCookieSpy = vi.spyOn(mockReply, 'clearCookie');
  //     const sendSpy = vi.spyOn(mockReply, 'send');

  //     expect(deleteSpy).toHaveBeenCalledWith({
  //       token: 'valid-refresh-token',
  //     });
  //     expect(clearCookieSpy).toHaveBeenCalledTimes(2);
  //     expect(sendSpy).toHaveBeenCalledWith({
  //       message: 'Logged out successfully',
  //     });
  //   });
  // });

  // describe('verifyEmail', () => {
  //   it("devrait vérifier l'email avec succès", async () => {
  //     const token = 'valid-token';
  //     const payload = { email: 'test@example.com' };

  //     jwtService.verifyAsync = vi.fn().mockResolvedValue(payload);
  //     musiRepository.findOneBy = vi.fn().mockResolvedValue(mockMusi);
  //     musiRepository.update = vi
  //       .fn()
  //       .mockResolvedValue({ ...mockMusi, isEmailVerified: true });

  //     const result = await service.verifyEmail(token);

  //     expect(result).toEqual({ message: 'Email verified with success!' });
  //     const updateSpy = vi.spyOn(musiRepository, 'update');
  //     expect(updateSpy).toHaveBeenCalled();
  //   });

  //   it("devrait lever une exception si l'utilisateur n'existe pas", async () => {
  //     jwtService.verifyAsync = vi
  //       .fn()
  //       .mockResolvedValue({ email: 'test@example.com' });
  //     musiRepository.findOneBy = vi.fn().mockResolvedValue(null);

  //     await expect(service.verifyEmail('valid-token')).rejects.toThrow(
  //       NotFoundException,
  //     );
  //   });

  //   it("devrait lever une exception si l'email est déjà vérifié", async () => {
  //     jwtService.verifyAsync = vi
  //       .fn()
  //       .mockResolvedValue({ email: 'test@example.com' });
  //     musiRepository.findOneBy = vi
  //       .fn()
  //       .mockResolvedValue({ ...mockMusi, isEmailVerified: true });

  //     await expect(service.verifyEmail('valid-token')).rejects.toThrow(
  //       ConflictException,
  //     );
  //   });
  // });

  // describe('createRefreshToken', () => {
  //   it('devrait créer un nouveau refresh token', async () => {
  //     refreshTokenRepository.save = vi.fn().mockResolvedValue(mockRefreshToken);

  //     const result = await service.createRefreshToken(mockMusi as Musi);

  //     expect(result).toBeDefined();
  //     const saveSpy = vi.spyOn(refreshTokenRepository, 'save');
  //     expect(saveSpy).toHaveBeenCalled();
  //   });
  // });

  describe('refreshAcessToken', () => {
    it("devrait rafraîchir le token d'accès avec succès", async () => {
      refreshTokenRepository.findOneBy = vi
        .fn()
        .mockResolvedValue(mockRefreshToken);
      musiRepository.findOneBy = vi.fn().mockResolvedValue(mockMusi);

      const result = await service.refreshAcessToken('valid-refresh-token');

      expect(result).toEqual({ accessToken: 'new-access-token' });
    });

    it("devrait lever une exception si le refresh token n'existe pas", async () => {
      refreshTokenRepository.findOneBy = vi.fn().mockResolvedValue(null);

      await expect(
        service.refreshAcessToken('invalid-refresh-token'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('devrait lever une exception si le refresh token est expiré', async () => {
      const expiredToken = {
        ...mockRefreshToken,
        expiresAt: new Date(Date.now() - 1000),
      };
      refreshTokenRepository.findOneBy = vi
        .fn()
        .mockResolvedValue(expiredToken);

      await expect(
        service.refreshAcessToken('expired-refresh-token'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it("devrait lever une exception si l'utilisateur n'existe pas ou n'est pas vérifié", async () => {
      refreshTokenRepository.findOneBy = vi
        .fn()
        .mockResolvedValue(mockRefreshToken);
      musiRepository.findOneBy = vi.fn().mockResolvedValue(null);

      await expect(
        service.refreshAcessToken('valid-refresh-token'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
