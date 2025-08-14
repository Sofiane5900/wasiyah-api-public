import { AuthService } from '../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MusiRepository } from '../../src/musi/musi.repository';
import { RefreshTokenRepository } from '../../src/refresh-token/refresh-token.repository';
import { SessionService } from '../../src/session/session.service';
import { Session } from '../../src/session/session.entity';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { RoleUser } from '../../src/enum/Roles';
import { Musi } from '../../src/musi/musi.entity';
import { RefreshToken } from '../../src/refresh-token/refresh-token.entity';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as argon2 from 'argon2';

// Mock UAParser
vi.mock('ua-parser-js', () => {
  return {
    UAParser: vi.fn().mockImplementation(() => ({
      getBrowser: vi.fn().mockReturnValue({ name: 'Chrome' }),
      getOS: vi.fn().mockReturnValue({ name: 'Windows' }),
      getDevice: vi.fn().mockReturnValue({ type: 'desktop', model: 'PC' }),
    })),
  };
});
const fixedDate = new Date('2025-08-08T12:41:55.765Z');

vi.mock('argon2', () => ({
  verify: vi.fn().mockResolvedValue(true),
}));

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let musiRepository: MusiRepository;
  let refreshTokenRepository: RefreshTokenRepository;
  let sessionService: SessionService;
  let mockReply: FastifyReply;
  let mockRequest: FastifyRequest;

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

  // Mock session save
  const mockSession = <Session>{
    id: '1',
    ipAdress: '127.0.0.1',
    dateTimeStamp: new Date(),
    user: mockMusi as Musi,
    browser: 'Chrome',
    os: 'Windows',
    deviceType: 'desktop',
    deviceModel: 'PC',
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

    // Mock sessionService
    sessionService = {
      save: vi.fn().mockResolvedValue(mockSession),
    } as unknown as SessionService;

    service = new AuthService(
      musiRepository,
      jwtService,
      refreshTokenRepository,
      sessionService,
    );

    mockReply = {
      cookie: vi.fn(),
      send: vi.fn(),
      clearCookie: vi.fn(),
    } as unknown as FastifyReply;

    // Mock request with IP and headers
    mockRequest = {
      ip: '127.0.0.1',
      headers: {
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    } as unknown as FastifyRequest;

    vi.useFakeTimers();
    vi.setSystemTime(fixedDate);

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('validateUser', () => {
    it('should return user information if credentials are valid', async () => {
      musiRepository.findOneBy = vi.fn().mockResolvedValue(mockMusi);

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toEqual({
        id: '1',
        email: 'test@example.com',
        roles: RoleUser.ROLE_MUSI,
        isEmailVerified: true,
      });
    });

    it('should return null if user does not exist', async () => {
      musiRepository.findOneBy = vi.fn().mockResolvedValue(null);

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      musiRepository.findOneBy = vi.fn().mockResolvedValue(mockMusi);
      vi.spyOn(argon2, 'verify').mockResolvedValue(false);

      const result = await service.validateUser(
        'test@example.com',
        'wrong-password',
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'test';
    });

    it('should successfully log in the user', async () => {
      // Mock validateUser
      const safeMusi = {
        id: '1',
        email: 'test@example.com',
        roles: RoleUser.ROLE_MUSI,
        isEmailVerified: true,
      };
      vi.spyOn(service, 'validateUser').mockResolvedValue(safeMusi);

      // Mock JWT sign
      vi.spyOn(jwtService, 'sign').mockReturnValue('new-access-token');

      // Mock findOneBy
      const musi = { ...mockMusi, id: '1' } as Musi;
      vi.spyOn(musiRepository, 'findOneBy').mockResolvedValue(musi);

      // Mock sessionService.save with new properties
      vi.spyOn(sessionService, 'save').mockResolvedValue(mockSession);

      // Mock createRefreshToken
      vi.spyOn(service, 'createRefreshToken').mockResolvedValue(
        'new-refresh-token',
      );

      // Mock reply methods
      const cookieSpy = vi.spyOn(mockReply, 'cookie');
      const sendSpy = vi.spyOn(mockReply, 'send');

      await service.login(
        'test@example.com',
        'password',
        mockReply,
        mockRequest,
      );

      // Verify validateUser was called
      expect(service.validateUser).toHaveBeenCalledWith(
        'test@example.com',
        'password',
      );

      // Verify JWT sign was called with correct parameters
      expect(jwtService.sign).toHaveBeenCalledWith(
        {
          sub: safeMusi.id,
          email: safeMusi.email,
          roles: safeMusi.roles,
        },
        {
          expiresIn: '15m',
        },
      );

      // Verify findOneBy was called
      expect(musiRepository.findOneBy).toHaveBeenCalledWith({
        email: 'test@example.com',
      });

      // Verify sessionService.save was called with new properties
      expect(sessionService.save).toHaveBeenCalledWith({
        ipAdress: '127.0.0.1',
        dateTimeStamp: fixedDate,
        userId: '1',
        browser: 'Chrome',
        os: 'Windows',
        deviceType: 'desktop',
        deviceModel: 'PC',
      });

      // Verify createRefreshToken was called
      expect(service.createRefreshToken).toHaveBeenCalledWith(musi);

      // Verify cookies
      expect(cookieSpy).toHaveBeenCalledTimes(2);
      expect(cookieSpy).toHaveBeenCalledWith(
        'access_token',
        'new-access-token',
        {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          path: '/',
          expires: expect.any(Date) as Date,
        },
      );
      expect(cookieSpy).toHaveBeenCalledWith(
        'refresh_token',
        'new-refresh-token',
        {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          path: '/',
          expires: expect.any(Date) as Date,
          domain: undefined,
        },
      );

      // Verify response
      expect(sendSpy).toHaveBeenCalledWith({
        accessToken: 'new-access-token',
      });
    });

    it('should throw an exception if credentials are invalid', async () => {
      vi.spyOn(service, 'validateUser').mockResolvedValue(null);
      const cookieSpy = vi.spyOn(mockReply, 'cookie');
      const sendSpy = vi.spyOn(mockReply, 'send');

      await expect(
        service.login(
          'test@example.com',
          'wrong-password',
          mockReply,
          mockRequest,
        ),
      ).rejects.toThrow(UnauthorizedException);

      expect(cookieSpy).not.toHaveBeenCalled();
      expect(sendSpy).not.toHaveBeenCalled();
      expect(sessionService.save).not.toHaveBeenCalled();
    });

    it('should throw an exception if email is not verified', async () => {
      const safeMusi = {
        id: '1',
        email: 'test@example.com',
        roles: RoleUser.ROLE_MUSI,
        isEmailVerified: false,
      };
      vi.spyOn(service, 'validateUser').mockResolvedValue(safeMusi);
      const cookieSpy = vi.spyOn(mockReply, 'cookie');
      const sendSpy = vi.spyOn(mockReply, 'send');

      await expect(
        service.login('test@example.com', 'password', mockReply, mockRequest),
      ).rejects.toThrow(UnauthorizedException);

      expect(cookieSpy).not.toHaveBeenCalled();
      expect(sendSpy).not.toHaveBeenCalled();
      expect(sessionService.save).not.toHaveBeenCalled();
    });

    it('should throw an exception if Musi is not found after validation', async () => {
      const safeMusi = {
        id: '1',
        email: 'test@example.com',
        roles: RoleUser.ROLE_MUSI,
        isEmailVerified: true,
      };
      vi.spyOn(service, 'validateUser').mockResolvedValue(safeMusi);
      vi.spyOn(musiRepository, 'findOneBy').mockResolvedValue(null);
      const cookieSpy = vi.spyOn(mockReply, 'cookie');
      const sendSpy = vi.spyOn(mockReply, 'send');

      await expect(
        service.login('test@example.com', 'password', mockReply, mockRequest),
      ).rejects.toThrow(NotFoundException);

      expect(cookieSpy).not.toHaveBeenCalled();
      expect(sendSpy).not.toHaveBeenCalled();
      expect(sessionService.save).not.toHaveBeenCalled();
    });

    it('should throw an exception if session tracking fails', async () => {
      const safeMusi = {
        id: '1',
        email: 'test@example.com',
        roles: RoleUser.ROLE_MUSI,
        isEmailVerified: true,
      };
      vi.spyOn(service, 'validateUser').mockResolvedValue(safeMusi);
      const musi = { ...mockMusi, id: '1' } as Musi;
      vi.spyOn(musiRepository, 'findOneBy').mockResolvedValue(musi);

      // Mock sessionService.save to return null/undefined
      vi.spyOn(sessionService, 'save').mockResolvedValue(null);

      const cookieSpy = vi.spyOn(mockReply, 'cookie');
      const sendSpy = vi.spyOn(mockReply, 'send');

      await expect(
        service.login('test@example.com', 'password', mockReply, mockRequest),
      ).rejects.toThrow(UnauthorizedException);

      expect(cookieSpy).not.toHaveBeenCalled();
      expect(sendSpy).not.toHaveBeenCalled();
      expect(sessionService.save).toHaveBeenCalledWith({
        ipAdress: '127.0.0.1',
        dateTimeStamp: expect.any(Date),
        userId: '1',
        browser: 'Chrome',
        os: 'Windows',
        deviceType: 'desktop',
        deviceModel: 'PC',
      });
    });

    it('should configure secure cookies in production mode', async () => {
      process.env.NODE_ENV = 'prod';
      const safeMusi = {
        id: '1',
        email: 'test@example.com',
        roles: RoleUser.ROLE_MUSI,
        isEmailVerified: true,
      };
      vi.spyOn(service, 'validateUser').mockResolvedValue(safeMusi);
      vi.spyOn(jwtService, 'sign').mockReturnValue('new-access-token');
      const musi = { ...mockMusi, id: '1' } as Musi;
      vi.spyOn(musiRepository, 'findOneBy').mockResolvedValue(musi);
      vi.spyOn(sessionService, 'save').mockResolvedValue(mockSession);
      vi.spyOn(service, 'createRefreshToken').mockResolvedValue(
        'new-refresh-token',
      );
      const cookieSpy = vi.spyOn(mockReply, 'cookie');

      await service.login(
        'test@example.com',
        'password',
        mockReply,
        mockRequest,
      );

      expect(cookieSpy).toHaveBeenCalledWith(
        'access_token',
        'new-access-token',
        {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/',
          expires: expect.any(Date) as Date,
        },
      );
      expect(cookieSpy).toHaveBeenCalledWith(
        'refresh_token',
        'new-refresh-token',
        {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/',
          expires: expect.any(Date) as Date,
          domain: undefined,
        },
      );
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'test';
    });

    it('should successfully log out the user', async () => {
      // Mock delete
      const deleteSpy = vi.spyOn(refreshTokenRepository, 'delete');

      // Mock reply methods
      const clearCookieSpy = vi.spyOn(mockReply, 'clearCookie');
      const sendSpy = vi.spyOn(mockReply, 'send');

      await service.logout('valid-refresh-token', mockReply);

      // Verify refresh token was deleted
      expect(deleteSpy).toHaveBeenCalledWith({
        token: 'valid-refresh-token',
      });

      // Verify cookies were cleared
      expect(clearCookieSpy).toHaveBeenCalledTimes(2);
      expect(clearCookieSpy).toHaveBeenCalledWith('refresh-token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/',
      });
      expect(clearCookieSpy).toHaveBeenCalledWith('access_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/',
      });

      // Verify response
      expect(sendSpy).toHaveBeenCalledWith({
        message: 'Logged out successfully',
      });
    });
  });

  describe('verifyEmail', () => {
    beforeEach(() => {
      // Reset mocks before each test
      vi.clearAllMocks();
    });

    it('should successfully verify email', async () => {
      const token = 'valid-token';
      const payload = { email: 'test@example.com' };

      // Mock JWT service
      jwtService.verifyAsync = vi.fn().mockResolvedValue(payload);

      // Mock repository - return user with email not verify
      musiRepository.findOneBy = vi.fn().mockResolvedValue({
        ...mockMusi,
        email: payload.email,
        isEmailVerified: false,
      });

      // Mock update method
      musiRepository.update = vi.fn().mockResolvedValue(undefined);

      const result = await service.verifyEmail(token);

      // Verifications
      expect(result).toEqual({ message: 'Email verified with success!' });
      expect(jwtService.verifyAsync).toHaveBeenCalledWith(token);
      expect(musiRepository.findOneBy).toHaveBeenCalledWith({
        email: payload.email,
      });
      expect(musiRepository.update).toHaveBeenCalledWith(mockMusi.id, {
        ...mockMusi,
        email: payload.email,
        isEmailVerified: true,
      });
    });

    it('should throw UnauthorizedException if user does not exist', async () => {
      const token = 'valid-token';
      const payload = { email: 'test@example.com' };

      jwtService.verifyAsync = vi.fn().mockResolvedValue(payload);
      musiRepository.findOneBy = vi.fn().mockResolvedValue(null);

      await expect(service.verifyEmail(token)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(jwtService.verifyAsync).toHaveBeenCalledWith(token);
      expect(musiRepository.findOneBy).toHaveBeenCalledWith({
        email: payload.email,
      });
      expect(musiRepository.update).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if email is already verified', async () => {
      const token = 'valid-token';
      const payload = { email: 'test@example.com' };

      jwtService.verifyAsync = vi.fn().mockResolvedValue(payload);
      musiRepository.findOneBy = vi.fn().mockResolvedValue({
        ...mockMusi,
        email: payload.email,
        isEmailVerified: true,
      });

      await expect(service.verifyEmail(token)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(jwtService.verifyAsync).toHaveBeenCalledWith(token);
      expect(musiRepository.findOneBy).toHaveBeenCalledWith({
        email: payload.email,
      });
      expect(musiRepository.update).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if token is invalid', async () => {
      const token = 'invalid-token';

      jwtService.verifyAsync = vi
        .fn()
        .mockRejectedValue(new Error('Invalid token'));

      await expect(service.verifyEmail(token)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(jwtService.verifyAsync).toHaveBeenCalledWith(token);
      expect(musiRepository.findOneBy).not.toHaveBeenCalled();
      expect(musiRepository.update).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException for any other error', async () => {
      const token = 'valid-token';
      const payload = { email: 'test@example.com' };

      jwtService.verifyAsync = vi.fn().mockResolvedValue(payload);

      musiRepository.findOneBy = vi
        .fn()
        .mockRejectedValue(new Error('Database error'));

      await expect(service.verifyEmail(token)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(jwtService.verifyAsync).toHaveBeenCalledWith(token);
      expect(musiRepository.findOneBy).toHaveBeenCalledWith({
        email: payload.email,
      });
      expect(musiRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('createRefreshToken', () => {
    it('should create a new refresh token', async () => {
      const musi = mockMusi as Musi;

      const saveSpy = vi.spyOn(refreshTokenRepository, 'save');
      saveSpy.mockResolvedValue(mockRefreshToken);

      const result = await service.createRefreshToken(musi);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result).toHaveLength(64);

      // Verify call with expected properties
      expect(saveSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          user: musi,
          email: musi.email,
          token: result,
          expiresAt: expect.any(Date),
        }),
      );
    });

    it('should generate a unique token', async () => {
      const musi = mockMusi as Musi;
      const tokens = new Set<string>();

      for (let i = 0; i < 10; i++) {
        const token = await service.createRefreshToken(musi);
        tokens.add(token);
      }

      expect(tokens.size).toBe(10);
    });
  });

  describe('refreshAcessToken', () => {
    it('should successfully refresh access token', async () => {
      refreshTokenRepository.findOneBy = vi
        .fn()
        .mockResolvedValue(mockRefreshToken);
      musiRepository.findOneBy = vi.fn().mockResolvedValue(mockMusi);

      const result = await service.refreshAcessToken('valid-refresh-token');

      expect(result).toEqual({ accessToken: 'new-access-token' });
    });

    it('should throw exception if refresh token does not exist', async () => {
      refreshTokenRepository.findOneBy = vi.fn().mockResolvedValue(null);

      await expect(
        service.refreshAcessToken('invalid-refresh-token'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw exception if refresh token is expired', async () => {
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

    it('should throw exception if user does not exist or is not verified', async () => {
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
