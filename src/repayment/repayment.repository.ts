import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Repayment } from './repayment.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class RepaymentRepository extends ServiceEntityRepository<Repayment> {
  constructor(private readonly dataSource: DataSource) {
    super(Repayment, dataSource.createEntityManager());
  }

  // Méthode d'exemple, tu peux l'adapter ou en ajouter d'autres
  /*async findByExampleField(value: string): Promise<repayment | null> {
    return this.findOneBy({ value });
  }*/
}
