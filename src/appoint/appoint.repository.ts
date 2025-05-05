import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Appoint } from './appoint.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AppointRepository extends ServiceEntityRepository<Appoint> {
  constructor(private readonly dataSource: DataSource) {
    super(Appoint, dataSource.createEntityManager());
  }

  // Example method—you can adapt it or add others as needed.
  /*async findByExampleField(value: string): Promise<Appoint | null> {
    return this.findOneBy({ value });
  }*/
}
