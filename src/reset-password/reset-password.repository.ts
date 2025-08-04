import { DataSource } from 'typeorm';
import { ResetPassword } from './reset-password.entity';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResetPasswordRepository extends ServiceEntityRepository<ResetPassword> {
  constructor(private readonly dataSource: DataSource) {
    super(ResetPassword, dataSource.createEntityManager());
  }
}
