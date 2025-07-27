import { RefreshTokenMiddleware } from 'src/refresh-token/refresh-token.middleware';
import { RefreshTokenRepository } from 'src/refresh-token/refresh-token.repository';
import { MusiRepository } from 'src/musi/musi.repository';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { RequestWithRefresh } from 'src/refresh-token/request-refresh.interface';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('RefreshTokenMiddleware', () => {
  let middleware: RefreshTokenMiddleware;

  const mockRefreshTokenRepository = {
    findOneBy: vi.fn(),
  };

  const mockMusiRepository = {
    findOneBy: vi.fn(),
  };

  const mockJwtService = {
    decode: vi.fn(),
  };

  beforeEach(() => {
    middleware = new RefreshTokenMiddleware(
      mockRefreshTokenRepository as unknown as RefreshTokenRepository,
      mockMusiRepository as unknown as MusiRepository,
      mockJwtService as unknown as JwtService,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('use', () => {
    const mockReq = {
      headers: {
        cookie: '',
      },
    } as RequestWithRefresh;

    const mockRes = {
      clearCookie: vi.fn(),
    } as unknown as FastifyReply;

    const mockNext = vi.fn();

    it("devrait lancer une exception si aucun cookie n'est présent", async () => {
      mockReq.headers.cookie = '';

      await expect(middleware.use(mockReq, mockRes, mockNext)).rejects.toThrow(
        new UnauthorizedException('Bad request'),
      );
    });

    it('devrait lancer une exception si le refresh token est manquant', async () => {
      mockReq.headers.cookie = 'access_token=valid.access.token';

      await expect(middleware.use(mockReq, mockRes, mockNext)).rejects.toThrow(
        new UnauthorizedException('Refresh token is missing'),
      );
      expect(mockRes.clearCookie).toHaveBeenCalledWith('access_token');
      expect(mockRes.clearCookie).toHaveBeenCalledWith('refresh_token');
    });

    it('devrait passer au middleware suivant si les deux tokens sont valides', async () => {
      const validAccessToken = 'access_token';
      const validRefreshToken = 'refreshToken';
      mockReq.headers.cookie = `access_token=${validAccessToken}; refresh_token=${validRefreshToken}`;

      mockJwtService.decode.mockReturnValue({
        exp: Math.floor(Date.now() / 1000) + 3600,
      });
      mockRefreshTokenRepository.findOneBy.mockResolvedValue({
        token: validRefreshToken,
        expiresAt: new Date(Date.now() + 3600000),
      });

      await middleware.use(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('devrait lancer une exception si le refresh token est invalide', async () => {
      const validAccessToken = 'access_token';
      const invalidRefreshToken = 'invalid.refresh.token';
      mockReq.headers.cookie = `access_token=${validAccessToken}; refresh_token=${invalidRefreshToken}`;

      mockJwtService.decode.mockReturnValue({
        exp: Math.floor(Date.now() / 1000) + 3600,
      });
      mockRefreshTokenRepository.findOneBy.mockResolvedValue(null);

      await expect(middleware.use(mockReq, mockRes, mockNext)).rejects.toThrow(
        new UnauthorizedException('Refresh token is invalid or expired'),
      );
      expect(mockRes.clearCookie).toHaveBeenCalledWith('access_token');
      expect(mockRes.clearCookie).toHaveBeenCalledWith('refresh_token');
    });

    it("devrait lancer une exception si l'utilisateur n'est pas trouvé", async () => {
      const validAccessToken = 'valid.access.token';
      const validRefreshToken = 'valid.refresh.token';
      mockReq.headers.cookie = `access_token=${validAccessToken}; refresh_token=${validRefreshToken}`;

      mockJwtService.decode.mockReturnValue({
        exp: Math.floor(Date.now() / 1000) - 3600,
      });
      mockRefreshTokenRepository.findOneBy.mockResolvedValue({
        token: validRefreshToken,
        expiresAt: new Date(Date.now() + 3600000),
        email: 'test@example.com',
      });
      mockMusiRepository.findOneBy.mockResolvedValue(null);

      await expect(middleware.use(mockReq, mockRes, mockNext)).rejects.toThrow(
        new UnauthorizedException('User not found or email not verified'),
      );
    });

    it("devrait lancer une exception si l'email de l'utilisateur n'est pas vérifié", async () => {
      const validAccessToken = 'valid.access.token';
      const validRefreshToken = 'valid.refresh.token';
      mockReq.headers.cookie = `access_token=${validAccessToken}; refresh_token=${validRefreshToken}`;

      mockJwtService.decode.mockReturnValue({
        exp: Math.floor(Date.now() / 1000) - 3600,
      });
      mockRefreshTokenRepository.findOneBy.mockResolvedValue({
        token: validRefreshToken,
        expiresAt: new Date(Date.now() + 3600000),
        email: 'test@example.com',
      });
      mockMusiRepository.findOneBy.mockResolvedValue({
        email: 'test@example.com',
        isEmailVerified: false,
      });

      await expect(middleware.use(mockReq, mockRes, mockNext)).rejects.toThrow(
        new UnauthorizedException('User not found or email not verified'),
      );
    });
  });
});