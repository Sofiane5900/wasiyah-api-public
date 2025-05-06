import { Module } from '@nestjs/common';
import { RepaymentController } from './repayment.controller';
import { RepaymentService } from './repayment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repayment } from './repayment.entity';
import { RepaymentRepository } from './repayment.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Repayment])],
  controllers: [RepaymentController],
  providers: [
    RepaymentService,
    {
      provide: RepaymentRepository,
      useFactory: (dataSource: DataSource) => {
        return new RepaymentRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  exports: [RepaymentRepository],
})
export class RepaymentModule {}
