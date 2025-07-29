import { Injectable } from '@nestjs/common';
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
}
