import { Module } from '@nestjs/common';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './loan.entity';
import { DataSource } from 'typeorm';
import { LoanRepository } from './loan.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Loan])],
  controllers: [LoanController],
  providers: [
    LoanService,
    {
      provide: LoanRepository,
      useFactory: (dataSource: DataSource) => {
        return new LoanRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  exports: [LoanRepository],
})
export class LoanModule {}
