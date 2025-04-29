import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Loan } from './loan.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class LoanRepository extends ServiceEntityRepository<Loan> {
  constructor(private readonly dataSource: DataSource) {
    super(Loan, dataSource.createEntityManager());
  }

  // Méthode d'exemple, tu peux l'adapter ou en ajouter d'autres
  /*async findByExampleField(value: string): Promise<Loan | null> {
    return this.findOneBy({ value });
  }*/
}
