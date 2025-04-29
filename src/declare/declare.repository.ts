import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Declare } from './declare.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class DeclareRepository extends ServiceEntityRepository<Declare> {
  constructor(private readonly dataSource: DataSource) {
    super(Declare, dataSource.createEntityManager());
  }

  // Méthode d'exemple, tu peux l'adapter ou en ajouter d'autres
  /*async findByExampleField(value: string): Promise<Declare | null> {
    return this.findOneBy({ value });
  }*/
}
