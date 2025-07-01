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

    // Reset mocks before each test
    vi.clearAllMocks();
    mockRequest.cookies = {};
    mockRequest.user = undefined;

    // Mock NODE_ENV for tests
    process.env.NODE_ENV = 'test';
  });

  describe('canActivate', () => {
    it('should throw UnauthorizedException if no token is provided', async () => {
      mockRequest.cookies = {};

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        'Authentication error',
      );
    });

    it('should throw UnauthorizedException if the refresh token does not exist in the database', async () => {
      mockRequest.cookies = {
        refresh_token: 'invalid-refresh-token',
      };

      vi.mocked(refreshTokenRepository.findOneBy).mockResolvedValue(null);

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        'Authentication error',
      );
    });

    it('should throw UnauthorizedException if the refresh token is invalid', async () => {
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
        'Authentication error',
      );
    });

    it('should handle general errors and throw UnauthorizedException', async () => {
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
        'Authentication error',
      );
    });
  });
});
