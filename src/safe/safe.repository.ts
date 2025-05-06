import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Safe } from './safe.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class SafeRepository extends ServiceEntityRepository<Safe> {
  constructor(private readonly dataSource: DataSource) {
    super(Safe, dataSource.createEntityManager());
  }

  // Example method—you can adapt it or add others as needed.
  /*async findByExampleField(value: string): Promise<Safe | null> {
    return this.findOneBy({ value });
  }*/
}
