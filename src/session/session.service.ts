import { Injectable, NotFoundException } from '@nestjs/common';
import { SessionRepository } from './session.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionRepository)
    private readonly sessionRepository: SessionRepository,
  ) {}

  async save(sessionData: object): Promise<Session> {
    return this.sessionRepository.save(sessionData);
  }

  async findSessionById(id: string): Promise<Session | null> {
    const session = await this.sessionRepository.findOne({ where: { id } });
    if (!session) {
      throw new NotFoundException(`Session not found with ID: ${id}`);
    }
    return session;
  }

  async findSessionByUserId(userId: string): Promise<Session | null> {
    const findByIdUser = await this.sessionRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!findByIdUser) {
      throw new NotFoundException(`Session not found for user ID: ${userId}`);
    }
    return findByIdUser;
  }

  async findAllSessions(): Promise<Session[]> {
    const sessions = await this.sessionRepository.find();
    if (!sessions || sessions.length === 0) {
      throw new NotFoundException('No sessions found');
    }
    return sessions;
  }
}
