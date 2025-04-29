import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Wakil } from './wakil.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class WakilRepository extends ServiceEntityRepository<Wakil> {
  constructor(private readonly dataSource: DataSource) {
    super(Wakil, dataSource.createEntityManager());
  }

  // Méthode d'exemple, tu peux l'adapter ou en ajouter d'autres
  /*async findByExampleField(value: string): Promise<Wakil | null> {
    return this.findOneBy({ value });
  }*/
}
