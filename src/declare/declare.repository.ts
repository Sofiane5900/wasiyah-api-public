import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Declare } from './declare.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class DeclareRepository extends ServiceEntityRepository<Declare> {
  constructor(private readonly dataSource: DataSource) {
    super(Declare, dataSource.createEntityManager());
  }

  // Example method—you can adapt it or add others as needed.
  /*async findByExampleField(value: string): Promise<Declare | null> {
    return this.findOneBy({ value });
  }*/
}
