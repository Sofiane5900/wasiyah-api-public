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

  async findSessionByUserId(userId: string): Promise<Session | null> {
    const findByIdUser = await this.sessionRepository.findOne({
      where: { user: { id: userId } },
    });
    console.log('console log : => findByIdUser', userId);

    if (!findByIdUser) {
      throw new NotFoundException(`Session not found for user ID: ${userId}`);
    }
    return findByIdUser;
  }
}
