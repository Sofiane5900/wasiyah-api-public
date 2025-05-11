import { AuthService } from '../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MusiRepository } from '../../src/musi/musi.repository';
import { RefreshTokenRepository } from '../../src/refresh-token/refresh-token.repository';
import { UnauthorizedException } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { RoleUser } from '../../src/enum/Roles';
import { Musi } from '../../src/musi/musi.entity';
import { RefreshToken } from '../../src/refresh-token/refresh-token.entity';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let musiRepository: MusiRepository;
  let refreshTokenRepository: RefreshTokenRepository;
  let mockReply: FastifyReply;

  const mockMusi: Partial<Musi> = {
    id: '1',
    email: 'test@example.com',
    roles: RoleUser.ROLE_MUSI,
    isEmailVerified: true,
  };

  const mockRefreshToken: Partial<RefreshToken> = {
    id: '1',
    token: 'valid-refresh-token',
    email: 'test@example.com',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
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
      update: vi.fn(),
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
  });

  describe('refreshAcessToken', () => {
    it('should issue a new access token if refresh token is valid and not expired', async () => {
      // Arrange
      const findOneBySpy = vi.spyOn(refreshTokenRepository, 'findOneBy');
      const musiFindOneBySpy = vi.spyOn(musiRepository, 'findOneBy');
      const signSpy = vi.spyOn(jwtService, 'sign');
      const cookieSpy = vi.spyOn(mockReply, 'cookie');
      const sendSpy = vi.spyOn(mockReply, 'send');

      findOneBySpy.mockResolvedValue(mockRefreshToken as RefreshToken);
      musiFindOneBySpy.mockResolvedValue(mockMusi as Musi);

      // Act
      await service.refreshAcessToken('valid-refresh-token', mockReply);

      // Assert
      expect(findOneBySpy).toHaveBeenCalledWith({
        token: 'valid-refresh-token',
      });
      expect(musiFindOneBySpy).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
      expect(signSpy).toHaveBeenCalledWith({
        sub: '1',
        email: 'test@example.com',
        roles: RoleUser.ROLE_MUSI,
      });
      expect(cookieSpy).toHaveBeenCalledWith(
        'access_token',
        'new-access-token',
        expect.any(Object),
      );
      expect(sendSpy).toHaveBeenCalledWith({
        accessToken: 'new-access-token',
      });
    });

    it('should throw UnauthorizedException if the token does not exist', async () => {
      // Arrange
      const findOneBySpy = vi.spyOn(refreshTokenRepository, 'findOneBy');
      const cookieSpy = vi.spyOn(mockReply, 'cookie');
      const sendSpy = vi.spyOn(mockReply, 'send');

      findOneBySpy.mockResolvedValue(null);

      // Act & Assert
      await expect(
        service.refreshAcessToken('invalid-refresh-token', mockReply),
      ).rejects.toThrow(UnauthorizedException);
      expect(cookieSpy).not.toHaveBeenCalled();
      expect(sendSpy).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if the token is expired', async () => {
      // Arrange
      const expiredToken = {
        ...mockRefreshToken,
        expiresAt: new Date(Date.now() - 1000), // 1 second ago
      };
      const findOneBySpy = vi.spyOn(refreshTokenRepository, 'findOneBy');
      const cookieSpy = vi.spyOn(mockReply, 'cookie');
      const sendSpy = vi.spyOn(mockReply, 'send');

      findOneBySpy.mockResolvedValue(expiredToken as RefreshToken);

      // Act & Assert
      await expect(
        service.refreshAcessToken('expired-refresh-token', mockReply),
      ).rejects.toThrow(UnauthorizedException);
      expect(cookieSpy).not.toHaveBeenCalled();
      expect(sendSpy).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if the user is not found or not verified', async () => {
      // Arrange
      const findOneBySpy = vi.spyOn(refreshTokenRepository, 'findOneBy');
      const musiFindOneBySpy = vi.spyOn(musiRepository, 'findOneBy');
      const cookieSpy = vi.spyOn(mockReply, 'cookie');
      const sendSpy = vi.spyOn(mockReply, 'send');

      findOneBySpy.mockResolvedValue(mockRefreshToken as RefreshToken);
      musiFindOneBySpy.mockResolvedValue({
        ...mockMusi,
        isEmailVerified: false,
      } as Musi);

      // Act & Assert
      await expect(
        service.refreshAcessToken('valid-refresh-token', mockReply),
      ).rejects.toThrow(UnauthorizedException);
      expect(cookieSpy).not.toHaveBeenCalled();
      expect(sendSpy).not.toHaveBeenCalled();
    });
  });
});
