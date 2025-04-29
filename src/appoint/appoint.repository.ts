import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Appoint } from './appoint.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AppointRepository extends ServiceEntityRepository<Appoint> {
  constructor(private readonly dataSource: DataSource) {
    super(Appoint, dataSource.createEntityManager());
  }

  // Méthode d'exemple, tu peux l'adapter ou en ajouter d'autres
  /*async findByExampleField(value: string): Promise<Appoint | null> {
    return this.findOneBy({ value });
  }*/
}
