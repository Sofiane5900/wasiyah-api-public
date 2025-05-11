import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from 'src/common/abstract/abstract-service-entity.repository';
import { RefreshToken } from './refresh-token.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class RefreshTokenRepository extends ServiceEntityRepository<RefreshToken> {
  constructor(private readonly dataSource: DataSource) {
    super(RefreshToken, dataSource.createEntityManager());
  }
}
