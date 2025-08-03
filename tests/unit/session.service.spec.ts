import { SessionService } from '../../src/session/session.service';
import { SessionRepository } from '../../src/session/session.repository';
import { Session } from '../../src/session/session.entity';
import { Musi } from '../../src/musi/musi.entity';
import { NotFoundException } from '@nestjs/common';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('SessionService', () => {
  let service: SessionService;
  let sessionRepository: SessionRepository;

  const mockMusi: Partial<Musi> = {
    id: '1',
    email: 'test@example.com',
    roles: ['ROLE_MUSI'],
    isEmailVerified: true,
  };

  const mockSession: Partial<Session> = {
    id: 'session-1',
    ipAdress: '127.0.0.1',
    dateTimeStamp: new Date('2025-01-15T10:30:00Z'),
    user: mockMusi as Musi,
  };

  const mockSessionData = {
    ipAdress: '127.0.0.1',
    dateTimeStamp: new Date('2025-01-15T10:30:00Z'),
    user: '1',
  };

  beforeEach(() => {
    sessionRepository = {
      save: vi.fn(),
      findOne: vi.fn(),
      find: vi.fn(),
    } as unknown as SessionRepository;

    service = new SessionService(sessionRepository);

    vi.clearAllMocks();
  });

  describe('save', () => {
    it('should save a session successfully', async () => {
      const sessionData = { ...mockSessionData };
      const expectedSession = { ...mockSession };

      vi.spyOn(sessionRepository, 'save').mockResolvedValue(
        expectedSession as Session,
      );

      const result = await service.save(sessionData);

      expect(sessionRepository.save).toHaveBeenCalledWith(sessionData);
      expect(result).toEqual(expectedSession);
    });

    it('should handle errors during save', async () => {
      const sessionData = { ...mockSessionData };
      const error = new Error('Erreur de base de données');

      vi.spyOn(sessionRepository, 'save').mockRejectedValue(error);

      await expect(service.save(sessionData)).rejects.toThrow(error);
      expect(sessionRepository.save).toHaveBeenCalledWith(sessionData);
    });

    it('should save a session with minimal data', async () => {
      const minimalSessionData = {
        ipAdress: '192.168.1.1',
        user: '2',
      };
      const expectedSession = {
        id: 'session-2',
        ...minimalSessionData,
        dateTimeStamp: expect.any(Date),
      };

      vi.spyOn(sessionRepository, 'save').mockResolvedValue(
        expectedSession as Session,
      );

      const result = await service.save(minimalSessionData);

      expect(sessionRepository.save).toHaveBeenCalledWith(minimalSessionData);
      expect(result).toEqual(expectedSession);
    });
  });

  describe('findSessionById', () => {
    it('should find a session by ID successfully', async () => {
      const sessionId = 'session-1';
      const expectedSession = { ...mockSession };

      vi.spyOn(sessionRepository, 'findOne').mockResolvedValue(
        expectedSession as Session,
      );

      const result = await service.findSessionById(sessionId);

      expect(sessionRepository.findOne).toHaveBeenCalledWith({
        where: { id: sessionId },
      });
      expect(result).toEqual(expectedSession);
    });

    it("should throw NotFoundException if session doesn't exist", async () => {
      const sessionId = 'session-inexistant';

      vi.spyOn(sessionRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findSessionById(sessionId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findSessionById(sessionId)).rejects.toThrow(
        `Session not found with ID: ${sessionId}`,
      );

      expect(sessionRepository.findOne).toHaveBeenCalledWith({
        where: { id: sessionId },
      });
    });

    it('should handle database errors', async () => {
      const sessionId = 'session-1';
      const error = new Error('Erreur de connexion à la base de données');

      vi.spyOn(sessionRepository, 'findOne').mockRejectedValue(error);

      await expect(service.findSessionById(sessionId)).rejects.toThrow(error);
      expect(sessionRepository.findOne).toHaveBeenCalledWith({
        where: { id: sessionId },
      });
    });

    it('should accept a valid ID with special characters', async () => {
      const sessionId = 'session-uuid-123e4567-e89b-12d3-a456-426614174000';
      const expectedSession = { ...mockSession, id: sessionId };

      vi.spyOn(sessionRepository, 'findOne').mockResolvedValue(
        expectedSession as Session,
      );

      const result = await service.findSessionById(sessionId);

      expect(sessionRepository.findOne).toHaveBeenCalledWith({
        where: { id: sessionId },
      });
      expect(result).toEqual(expectedSession);
    });
  });

  describe('findSessionByUserId', () => {
    it('should find a session by user ID successfully', async () => {
      const userId = '1';
      const expectedSession = { ...mockSession };

      vi.spyOn(sessionRepository, 'findOne').mockResolvedValue(
        expectedSession as Session,
      );

      const result = await service.findSessionByUserId(userId);

      expect(sessionRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId } },
      });
      expect(result).toEqual(expectedSession);
    });

    it('should throw NotFoundException if no session exists for the user', async () => {
      const userId = '999';

      vi.spyOn(sessionRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findSessionByUserId(userId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findSessionByUserId(userId)).rejects.toThrow(
        `Session not found for user ID: ${userId}`,
      );

      expect(sessionRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId } },
      });
    });

    it('should handle database errors', async () => {
      const userId = '1';
      const error = new Error('Erreur de connexion à la base de données');

      vi.spyOn(sessionRepository, 'findOne').mockRejectedValue(error);

      await expect(service.findSessionByUserId(userId)).rejects.toThrow(error);
      expect(sessionRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId } },
      });
    });

    it('should accept a user ID with special characters', async () => {
      const userId = 'user-uuid-123e4567-e89b-12d3-a456-426614174000';
      const expectedSession = {
        ...mockSession,
        user: { ...mockMusi, id: userId },
      };

      vi.spyOn(sessionRepository, 'findOne').mockResolvedValue(
        expectedSession as Session,
      );

      const result = await service.findSessionByUserId(userId);

      expect(sessionRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: userId } },
      });
      expect(result).toEqual(expectedSession);
    });

    it('should display a console message for debugging', async () => {
      const userId = '1';
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const expectedSession = { ...mockSession };

      vi.spyOn(sessionRepository, 'findOne').mockResolvedValue(
        expectedSession as Session,
      );

      await service.findSessionByUserId(userId);

      expect(consoleSpy).toHaveBeenCalledWith(
        'console log : => findByIdUser',
        userId,
      );

      consoleSpy.mockRestore();
    });
  });

  describe('findAllSessions', () => {
    it('should return all sessions successfully', async () => {
      const expectedSessions = [
        { ...mockSession, id: 'session-1' },
        { ...mockSession, id: 'session-2' },
        { ...mockSession, id: 'session-3' },
      ];

      vi.spyOn(sessionRepository, 'find').mockResolvedValue(
        expectedSessions as Session[],
      );

      const result = await service.findAllSessions();

      expect(sessionRepository.find).toHaveBeenCalled();
      expect(result).toEqual(expectedSessions);
      expect(result).toHaveLength(3);
    });

    it('should throw NotFoundException if no sessions exist', async () => {
      vi.spyOn(sessionRepository, 'find').mockResolvedValue([]);

      await expect(service.findAllSessions()).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findAllSessions()).rejects.toThrow(
        'No sessions found',
      );

      expect(sessionRepository.find).toHaveBeenCalled();
    });

    it('should throw NotFoundException if result is null', async () => {
      vi.spyOn(sessionRepository, 'find').mockResolvedValue(null);

      await expect(service.findAllSessions()).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findAllSessions()).rejects.toThrow(
        'No sessions found',
      );

      expect(sessionRepository.find).toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      const error = new Error('Erreur de connexion à la base de données');

      vi.spyOn(sessionRepository, 'find').mockRejectedValue(error);

      await expect(service.findAllSessions()).rejects.toThrow(error);
      expect(sessionRepository.find).toHaveBeenCalled();
    });

    it('should return an empty list if no sessions found', async () => {
      vi.spyOn(sessionRepository, 'find').mockResolvedValue([]);

      await expect(service.findAllSessions()).rejects.toThrow(
        NotFoundException,
      );

      expect(sessionRepository.find).toHaveBeenCalled();
    });

    it('should return a single session', async () => {
      const singleSession = [{ ...mockSession, id: 'session-1' }];

      vi.spyOn(sessionRepository, 'find').mockResolvedValue(
        singleSession as Session[],
      );

      const result = await service.findAllSessions();

      expect(sessionRepository.find).toHaveBeenCalled();
      expect(result).toEqual(singleSession);
      expect(result).toHaveLength(1);
    });
  });

  describe('Intégration des méthodes', () => {
    it('should allow saving then retrieving a session', async () => {
      const sessionData = { ...mockSessionData };
      const savedSession = { ...mockSession };

      // Mock save
      vi.spyOn(sessionRepository, 'save').mockResolvedValue(
        savedSession as Session,
      );

      // Mock findOne for findSessionById
      vi.spyOn(sessionRepository, 'findOne')
        .mockResolvedValueOnce(savedSession as Session) // for findSessionById
        .mockResolvedValueOnce(savedSession as Session); // for findSessionByUserId

      // Save the session
      const saved = await service.save(sessionData);
      expect(saved).toEqual(savedSession);

      // find by ID
      const foundById = await service.findSessionById(savedSession.id);
      expect(foundById).toEqual(savedSession);

      // find by ID user
      const foundByUserId = await service.findSessionByUserId(
        savedSession.user.id,
      );
      expect(foundByUserId).toEqual(savedSession);
    });

    it('should handle error cases consistently', async () => {
      const sessionId = 'session-inexistant';
      const userId = 'user-inexistant';

      vi.spyOn(sessionRepository, 'findOne').mockResolvedValue(null);

      // all methode have to throw NotFoundException
      await expect(service.findSessionById(sessionId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findSessionByUserId(userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
