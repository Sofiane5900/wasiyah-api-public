import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Death } from './death.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class DeathRepository extends ServiceEntityRepository<Death> {
  constructor(private readonly dataSource: DataSource) {
    super(Death, dataSource.createEntityManager());
  }

  // Méthode d'exemple, tu peux l'adapter ou en ajouter d'autres
  /*async findByExampleField(value: string): Promise<Death | null> {
    return this.findOneBy({ value });
  }*/
}
