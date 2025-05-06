import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Testament } from './testament.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class TestamentRepository extends ServiceEntityRepository<Testament> {
  constructor(private readonly dataSource: DataSource) {
    super(Testament, dataSource.createEntityManager());
  }

  // Example method—you can adapt it or add others as needed.
  /*async findByExampleField(value: string): Promise<Testament | null> {
    return this.findOneBy({ value });
  }*/
}
