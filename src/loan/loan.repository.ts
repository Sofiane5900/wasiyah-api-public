import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Loan } from './loan.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class LoanRepository extends ServiceEntityRepository<Loan> {
  constructor(private readonly dataSource: DataSource) {
    super(Loan, dataSource.createEntityManager());
  }

  // Example method—you can adapt it or add others as needed.
  /*async findByExampleField(value: string): Promise<Loan | null> {
    return this.findOneBy({ value });
  }*/
}
