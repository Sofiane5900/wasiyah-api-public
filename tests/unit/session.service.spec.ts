import { NotFoundException } from '@nestjs/common';
import { SessionService } from 'src/session/session.service';
import { Session } from 'src/session/session.entity';
import { CreateSessionDto } from 'src/session/dto/create-session-dto';
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';

describe('SessionService', () => {
  let service: SessionService;
  let mockSessionRepository: any;
  let mockMusiRepository: any;

  const mockSession: Session = {
    id: 'session-uuid-123',
    dateTimeStamp: new Date('2025-01-15T10:30:00Z'),
    ipAdress: '192.168.1.1',
    browser: 'Chrome',
    os: 'Windows 10',
    deviceType: 'Desktop',
    deviceModel: 'Dell XPS',
    user: {
      id: 'user-uuid-456',
    } as any,
  };

  const mockUser = {
    id: 'user-uuid-456',
  };

  beforeEach(() => {
    // Création des mocks
    mockSessionRepository = {
      findOne: vi.fn(),
      find: vi.fn(),
      create: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
    };

    mockMusiRepository = {
      findOneBy: vi.fn(),
      findOne: vi.fn(),
      find: vi.fn(),
      save: vi.fn(),
    };

    // Création manuelle du service avec les mocks
    service = new SessionService(mockSessionRepository, mockMusiRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('save', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should save a session successfully', async () => {
      // Arrange
      const sessionData: CreateSessionDto = {
        dateTimeStamp: new Date('2025-01-15T10:30:00Z'),
        ipAdress: '192.168.1.1',
        browser: 'Chrome',
        os: 'Windows 10',
        deviceType: 'Desktop',
        deviceModel: 'Dell XPS',
        userId: 'user-uuid-456',
      };

      const createdSession = { ...sessionData, user: mockUser };

      mockMusiRepository.findOneBy.mockResolvedValue(mockUser);
      mockSessionRepository.create.mockReturnValue(createdSession);
      mockSessionRepository.save.mockResolvedValue(mockSession);

      // Act
      const result = await service.save(sessionData);

      // Assert
      expect(mockMusiRepository.findOneBy).toHaveBeenCalledWith({
        id: sessionData.userId,
      });
      expect(mockSessionRepository.create).toHaveBeenCalledWith({
        ...sessionData,
        user: mockUser,
      });
      expect(mockSessionRepository.save).toHaveBeenCalledWith(createdSession);
      expect(result).toEqual(mockSession);
    });

    it('should throw NotFoundException when user is not found', async () => {
      // Arrange
      const sessionData: CreateSessionDto = {
        dateTimeStamp: new Date('2025-01-15T10:30:00Z'),
        ipAdress: '192.168.1.1',
        userId: 'non-existent-user-id',
      };

      mockMusiRepository.findOneBy.mockResolvedValue(null);

      // Act & Assert
      await expect(service.save(sessionData)).rejects.toThrow(
        new NotFoundException(`User not found with ID: ${sessionData.userId}`),
      );

      expect(mockMusiRepository.findOneBy).toHaveBeenCalledWith({
        id: sessionData.userId,
      });
      expect(mockSessionRepository.create).not.toHaveBeenCalled();
      expect(mockSessionRepository.save).not.toHaveBeenCalled();
    });

    it('should handle errors during save', async () => {
      // Arrange
      const sessionData: CreateSessionDto = {
        dateTimeStamp: new Date('2025-01-15T10:30:00Z'),
        ipAdress: '192.168.1.1',
        userId: 'user-uuid-456',
      };

      const createdSession = { ...sessionData, user: mockUser };
      const saveError = new Error('Erreur de base de données');

      mockMusiRepository.findOneBy.mockResolvedValue(mockUser);
      mockSessionRepository.create.mockReturnValue(createdSession);
      mockSessionRepository.save.mockRejectedValue(saveError);

      // Act & Assert
      await expect(service.save(sessionData)).rejects.toThrow(saveError);

      expect(mockMusiRepository.findOneBy).toHaveBeenCalledWith({
        id: sessionData.userId,
      });
      expect(mockSessionRepository.create).toHaveBeenCalledWith({
        ...sessionData,
        user: mockUser,
      });
      expect(mockSessionRepository.save).toHaveBeenCalledWith(createdSession);
    });

    it('should save a session with minimal data', async () => {
      // Arrange
      const sessionData: CreateSessionDto = {
        dateTimeStamp: new Date('2025-01-15T10:30:00Z'),
        ipAdress: '192.168.1.1',
        userId: 'user-uuid-456',
      };

      const createdSession = { ...sessionData, user: mockUser };

      mockMusiRepository.findOneBy.mockResolvedValue(mockUser);
      mockSessionRepository.create.mockReturnValue(createdSession);
      mockSessionRepository.save.mockResolvedValue({
        ...mockSession,
        browser: undefined,
        os: undefined,
      });

      // Act
      const result = await service.save(sessionData);

      // Assert
      expect(mockMusiRepository.findOneBy).toHaveBeenCalledWith({
        id: sessionData.userId,
      });
      expect(mockSessionRepository.create).toHaveBeenCalledWith({
        ...sessionData,
        user: mockUser,
      });
      expect(result).toBeDefined();
    });

    it('should handle musiRepository findOneBy errors', async () => {
      // Arrange
      const sessionData: CreateSessionDto = {
        dateTimeStamp: new Date('2025-01-15T10:30:00Z'),
        ipAdress: '192.168.1.1',
        userId: 'user-uuid-456',
      };

      const dbError = new Error('Database connection failed');
      mockMusiRepository.findOneBy.mockRejectedValue(dbError);

      // Act & Assert
      await expect(service.save(sessionData)).rejects.toThrow(dbError);
      expect(mockMusiRepository.findOneBy).toHaveBeenCalledWith({
        id: sessionData.userId,
      });
      expect(mockSessionRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('findSessionById', () => {
    it('should find a session by ID successfully', async () => {
      // Arrange
      const sessionId = 'session-uuid-123';
      mockSessionRepository.findOne.mockResolvedValue(mockSession);

      // Act
      const result = await service.findSessionById(sessionId);

      // Assert
      expect(result).toEqual(mockSession);
      expect(mockSessionRepository.findOne).toHaveBeenCalledWith({
        where: { id: sessionId },
      });
    });

    it("should throw NotFoundException if session doesn't exist", async () => {
      // Arrange
      const sessionId = 'non-existent-session-id';
      mockSessionRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findSessionById(sessionId)).rejects.toThrow(
        new NotFoundException(`Session not found with ID: ${sessionId}`),
      );
    });

    it('should handle database errors', async () => {
      // Arrange
      const sessionId = 'session-uuid-123';
      const dbError = new Error('Database connection failed');
      mockSessionRepository.findOne.mockRejectedValue(dbError);

      // Act & Assert
      await expect(service.findSessionById(sessionId)).rejects.toThrow(dbError);
    });

    it('should accept a valid ID with special characters', async () => {
      // Arrange
      const sessionId = 'session-uuid-123-special!@#';
      mockSessionRepository.findOne.mockResolvedValue(mockSession);

      // Act
      const result = await service.findSessionById(sessionId);

      // Assert
      expect(result).toEqual(mockSession);
      expect(mockSessionRepository.findOne).toHaveBeenCalledWith({
        where: { id: sessionId },
      });
    });
  });

  describe('findSessionByUserId', () => {
    it('should find a session by user ID successfully', async () => {
      // Arrange
      const userId = 'user-uuid-456';
      mockSessionRepository.findOne.mockResolvedValue(mockSession);

      // Act
      const result = await service.findSessionByUserId(userId);

      // Assert
      expect(result).toEqual(mockSession);
      expect(mockSessionRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId } },
      });
    });

    it('should throw NotFoundException if no session exists for the user', async () => {
      // Arrange
      const userId = 'non-existent-user-id';
      mockSessionRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findSessionByUserId(userId)).rejects.toThrow(
        new NotFoundException(`Session not found for user ID: ${userId}`),
      );
    });

    it('should handle database errors', async () => {
      // Arrange
      const userId = 'user-uuid-456';
      const dbError = new Error('Database connection failed');
      mockSessionRepository.findOne.mockRejectedValue(dbError);

      // Act & Assert
      await expect(service.findSessionByUserId(userId)).rejects.toThrow(
        dbError,
      );
    });

    it('should accept a user ID with special characters', async () => {
      // Arrange
      const userId = 'user-uuid-456-special!@#';
      mockSessionRepository.findOne.mockResolvedValue(mockSession);

      // Act
      const result = await service.findSessionByUserId(userId);

      // Assert
      expect(result).toEqual(mockSession);
    });
  });

  describe('findAllSessions', () => {
    it('should return all sessions successfully', async () => {
      // Arrange
      const sessions = [mockSession];
      mockSessionRepository.find.mockResolvedValue(sessions);

      // Act
      const result = await service.findAllSessions();

      // Assert
      expect(result).toEqual(sessions);
      expect(mockSessionRepository.find).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no sessions exist', async () => {
      // Arrange
      mockSessionRepository.find.mockResolvedValue([]);

      // Act & Assert
      await expect(service.findAllSessions()).rejects.toThrow(
        new NotFoundException('No sessions found'),
      );
    });

    it('should throw NotFoundException if result is null', async () => {
      // Arrange
      mockSessionRepository.find.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findAllSessions()).rejects.toThrow(
        new NotFoundException('No sessions found'),
      );
    });

    it('should handle database errors', async () => {
      // Arrange
      const dbError = new Error('Database connection failed');
      mockSessionRepository.find.mockRejectedValue(dbError);

      // Act & Assert
      await expect(service.findAllSessions()).rejects.toThrow(dbError);
    });

    it('should return an empty list if no sessions found', async () => {
      // Arrange
      mockSessionRepository.find.mockResolvedValue([]);

      // Act & Assert
      await expect(service.findAllSessions()).rejects.toThrow(
        new NotFoundException('No sessions found'),
      );
    });

    it('should return a single session', async () => {
      // Arrange
      const sessions = [mockSession];
      mockSessionRepository.find.mockResolvedValue(sessions);

      // Act
      const result = await service.findAllSessions();

      // Assert
      expect(result).toEqual(sessions);
      expect(result).toHaveLength(1);
    });
  });

  describe('Intégration des méthodes', () => {
    it('should allow saving then retrieving a session', async () => {
      // Arrange
      const sessionData: CreateSessionDto = {
        dateTimeStamp: new Date('2025-01-15T10:30:00Z'),
        ipAdress: '192.168.1.1',
        userId: 'user-uuid-456',
      };

      const createdSession = { ...sessionData, user: mockUser };

      mockMusiRepository.findOneBy.mockResolvedValue(mockUser);
      mockSessionRepository.create.mockReturnValue(createdSession);
      mockSessionRepository.save.mockResolvedValue(mockSession);
      mockSessionRepository.findOne.mockResolvedValue(mockSession);

      // Act
      const savedSession = await service.save(sessionData);
      const foundSession = await service.findSessionById(savedSession.id);

      // Assert
      expect(savedSession).toEqual(mockSession);
      expect(foundSession).toEqual(mockSession);
      expect(mockMusiRepository.findOneBy).toHaveBeenCalledWith({
        id: sessionData.userId,
      });
      expect(mockSessionRepository.findOne).toHaveBeenCalledWith({
        where: { id: savedSession.id },
      });
    });

    it('should handle error cases consistently', async () => {
      // Arrange
      const nonExistentId = 'non-existent-id';
      mockSessionRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findSessionById(nonExistentId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findSessionByUserId(nonExistentId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
