import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Wakil } from './wakil.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class WakilRepository extends ServiceEntityRepository<Wakil> {
  constructor(private readonly dataSource: DataSource) {
    super(Wakil, dataSource.createEntityManager());
  }

  // Example method—you can adapt it or add others as needed.
  /*async findByExampleField(value: string): Promise<Wakil | null> {
    return this.findOneBy({ value });
  }*/
}
