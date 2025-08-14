import { Injectable, NotFoundException } from '@nestjs/common';
import { SessionRepository } from './session.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { CreateSessionDto } from './dto/create-session-dto';
import { MusiRepository } from 'src/musi/musi.repository';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionRepository)
    private readonly sessionRepository: SessionRepository,
    private readonly musiRepository: MusiRepository, // Assurez-vous d'importer MusiRepository
  ) {}

  /**
   * Saves a new session to the database.
   *
   * @param {CreateSessionDto} sessionData - The session data to be saved.
   * @returns {Promise<Session>} The saved session.
   */
  async save(sessionData: CreateSessionDto): Promise<Session> {
    const user = await this.musiRepository.findOneBy({
      id: sessionData.userId,
    });

    if (!user) {
      throw new NotFoundException(
        `User not found with ID: ${sessionData.userId}`,
      );
    }

    const session = this.sessionRepository.create({
      ...sessionData,
      user,
    });

    return this.sessionRepository.save(session);
  }

  /**
   * Retrieves a session by its unique identifier.
   *
   * @param {string} id - The unique identifier of the session (UUID).
   * @returns {Promise<Session>} The session if found.
   * @throws NotFoundException if no session is found with the provided ID.
   */
  async findSessionById(id: string): Promise<Session | null> {
    const session = await this.sessionRepository.findOne({ where: { id } });
    if (!session) {
      throw new NotFoundException(`Session not found with ID: ${id}`);
    }
    return session;
  }

  /**
   * Retrieves a session associated with a specific user.
   *
   * @param {string} userId - The ID of the user linked to the session.
   * @returns {Promise<Session>} The session if found.
   * @throws NotFoundException if no session is found for the given user ID.
   */
  async findSessionByUserId(userId: string): Promise<Session | null> {
    const findByIdUser = await this.sessionRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!findByIdUser) {
      throw new NotFoundException(`Session not found for user ID: ${userId}`);
    }
    return findByIdUser;
  }

  /**
   * Retrieves all sessions stored in the database.
   *
   * @returns {Promise<Session[]>} An array of all sessions.
   * @throws NotFoundException if no sessions are found.
   */
  async findAllSessions(): Promise<Session[]> {
    const sessions = await this.sessionRepository.find();
    if (!sessions || sessions.length === 0) {
      throw new NotFoundException('No sessions found');
    }
    return sessions;
  }
}
