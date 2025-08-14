import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { DataSource } from 'typeorm';
import { Session } from './session.entity';

@Injectable()
export class SessionRepository extends ServiceEntityRepository<Session> {
  constructor(private readonly dataSource: DataSource) {
    super(Session, dataSource.createEntityManager());
  }
}
