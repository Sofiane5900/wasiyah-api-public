import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Testament } from './testament.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class TestamentRepository extends ServiceEntityRepository<Testament> {
  constructor(private readonly dataSource: DataSource) {
    super(Testament, dataSource.createEntityManager());
  }

  // Méthode d'exemple, tu peux l'adapter ou en ajouter d'autres
  /*async findByExampleField(value: string): Promise<Testament | null> {
    return this.findOneBy({ value });
  }*/
}
