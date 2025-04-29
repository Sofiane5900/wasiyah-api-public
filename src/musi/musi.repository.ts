import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Musi } from './musi.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class MusiRepository extends ServiceEntityRepository<Musi> {
  constructor(private readonly dataSource: DataSource) {
    super(Musi, dataSource.createEntityManager());
  }

  // Méthode d'exemple, tu peux l'adapter ou en ajouter d'autres
  /*async findByExampleField(value: string): Promise<Musi | null> {
    return this.findOneBy({ value });
  }*/
}
