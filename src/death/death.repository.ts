import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Death } from './death.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class DeathRepository extends ServiceEntityRepository<Death> {
  constructor(private readonly dataSource: DataSource) {
    super(Death, dataSource.createEntityManager());
  }

  // Example method—you can adapt it or add others as needed.
  /*async findByExampleField(value: string): Promise<Death | null> {
    return this.findOneBy({ value });
  }*/
}
