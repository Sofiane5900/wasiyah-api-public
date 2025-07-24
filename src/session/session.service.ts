import { Injectable } from '@nestjs/common';
import { SessionRepository } from './session.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionRepository)
    private readonly musiRepository: SessionRepository,
  ) {}

  async save(sessionData: any): Promise<any> {
    return this.musiRepository.save(sessionData);
  }

  async findAll(): Promise<any[]> {
    return this.musiRepository.find();
  }
}
