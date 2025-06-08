import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guards';
import { AuthService } from 'src/auth/auth.service';
import { RefreshTokenRepository } from 'src/refresh-token/refresh-token.repository';
import { RoleUser } from 'src/enum/Roles';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { create } from 'domain';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let jwtService: JwtService;
  let authService: AuthService;
  let refreshTokenRepository: RefreshTokenRepository;

  const mockRequest = {
    cookies: {},
    user: undefined,
  } as FastifyRequest;

  const mockReply = {
    cookie: vi.fn(),
    clearCookie: vi.fn(),
  } as unknown as FastifyReply;

  const mockExecutionContext = {
    switchToHttp: vi.fn(() => ({
      getRequest: vi.fn(() => mockRequest),
      getResponse: vi.fn(() => mockReply),
    })),
  } as unknown as ExecutionContext;

  const mockJwtPayload = {
    sub: 'user-id',
    email: 'test@example.com',
    roles: RoleUser.ROLE_MUSI,
  };

  const mockRefreshToken = {
    id: 'refresh-id',
    token: 'valid-refresh-token',
    email: 'test@example.com',
    createdAt: new Date(Date.now()),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: vi.fn(),
            sign: vi.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {},
        },
        {
          provide: RefreshTokenRepository,
          useValue: {
            findOneBy: vi.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
    jwtService = module.get(JwtService);
    authService = module.get(AuthService);
    refreshTokenRepository = module.get(RefreshTokenRepository);

    // Reset mocks avant chaque test
    vi.clearAllMocks();
    mockRequest.cookies = {};
    mockRequest.user = undefined;

    // Mock de NODE_ENV pour les tests
    process.env.NODE_ENV = 'test';
  });

  describe('canActivate', () => {
    it('devrait retourner true avec un access token valide', async () => {
      mockRequest.cookies = {
        access_token: 'valid-access-token',
      };

      vi.mocked(jwtService.verifyAsync).mockResolvedValue(mockJwtPayload);
      vi.mocked(jwtService.sign).mockReturnValue('new-access-token');

      const result = await guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
      expect(jwtService.verifyAsync).toHaveBeenCalledWith(
        'valid-access-token',
        {
          algorithms: ['RS256'],
        },
      );
      expect(mockRequest.user).toEqual({
        id: mockJwtPayload.sub,
        email: mockJwtPayload.email,
        roles: mockJwtPayload.roles,
      });
      expect(mockReply.clearCookie).toHaveBeenCalledWith('access_token');
      expect(mockReply.cookie).toHaveBeenCalledWith(
        'access_token',
        'new-access-token',
        {
          httpOnly: true,
          secure: false, // NODE_ENV = 'test'
          sameSite: 'strict',
          maxAge: 5 * 60 * 1000,
        },
      );
    });

    it("devrait utiliser le refresh token si aucun access token n'est présent", async () => {
      mockRequest.cookies = {
        refresh_token: 'valid-refresh-token',
      };

      vi.mocked(refreshTokenRepository.findOneBy).mockResolvedValue(
        mockRefreshToken,
      );
      vi.mocked(jwtService.sign).mockReturnValue('new-access-token');

      const result = await guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
      expect(refreshTokenRepository.findOneBy).toHaveBeenCalledWith({
        token: 'valid-refresh-token',
      });
      expect(jwtService.sign).toHaveBeenCalledWith(
        {
          sub: mockRefreshToken.id,
          email: mockRefreshToken.email,
          roles: RoleUser.ROLE_MUSI,
        },
        {
          expiresIn: '1m',
          algorithm: 'RS256',
        },
      );
      expect(mockRequest.user).toEqual({
        id: String(mockRefreshToken.id),
        email: mockRefreshToken.email,
        roles: RoleUser.ROLE_MUSI,
      });
      expect(mockReply.cookie).toHaveBeenCalledWith(
        'access_token',
        'new-access-token',
        {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          maxAge: 5 * 60 * 1000,
        },
      );
    });

    it("devrait utiliser le refresh token si l'access token est invalide", async () => {
      mockRequest.cookies = {
        access_token: 'invalid-access-token',
        refresh_token: 'valid-refresh-token',
      };

      vi.mocked(jwtService.verifyAsync).mockRejectedValue(
        new Error('Token expired'),
      );
      vi.mocked(refreshTokenRepository.findOneBy).mockResolvedValue(
        mockRefreshToken,
      );
      vi.mocked(jwtService.sign).mockReturnValue('new-access-token');

      const result = await guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
      expect(jwtService.verifyAsync).toHaveBeenCalledWith(
        'invalid-access-token',
        {
          algorithms: ['RS256'],
        },
      );
      expect(refreshTokenRepository.findOneBy).toHaveBeenCalledWith({
        token: 'valid-refresh-token',
      });
      expect(mockRequest.user).toEqual({
        id: String(mockRefreshToken.id),
        email: mockRefreshToken.email,
        roles: RoleUser.ROLE_MUSI,
      });
    });

    it("devrait lever une UnauthorizedException si aucun token n'est fourni", async () => {
      mockRequest.cookies = {};

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        'No authentication token provided',
      );
    });

    it("devrait lever une UnauthorizedException si le refresh token n'existe pas en base", async () => {
      mockRequest.cookies = {
        refresh_token: 'invalid-refresh-token',
      };

      vi.mocked(refreshTokenRepository.findOneBy).mockResolvedValue(null);

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        'Invalid refresh token',
      );
    });

    it('devrait lever une UnauthorizedException si le refresh token est invalide', async () => {
      mockRequest.cookies = {
        access_token: 'invalid-access-token',
        refresh_token: 'invalid-refresh-token',
      };

      vi.mocked(jwtService.verifyAsync).mockRejectedValue(
        new Error('Token expired'),
      );
      vi.mocked(refreshTokenRepository.findOneBy).mockResolvedValue(null);

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        'Invalid refresh token',
      );
    });

    it('devrait gérer les erreurs lors de la génération du nouveau token', async () => {
      mockRequest.cookies = {
        access_token: 'valid-access-token',
      };

      vi.mocked(jwtService.verifyAsync).mockResolvedValue(mockJwtPayload);
      vi.mocked(jwtService.sign).mockImplementation(() => {
        throw new Error('Signing error');
      });

      // Spy sur console.error pour vérifier les logs
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const result = await guard.canActivate(mockExecutionContext);

      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error while generating new token:',
        expect.any(Error),
      );

      consoleSpy.mockRestore();
    });

    it('devrait gérer les erreurs générales et lever UnauthorizedException', async () => {
      mockRequest.cookies = {
        refresh_token: 'valid-refresh-token',
      };

      vi.mocked(refreshTokenRepository.findOneBy).mockRejectedValue(
        new Error('Database error'),
      );

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        'Database error',
      );
    });
  });
});
