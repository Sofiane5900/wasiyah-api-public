import { Module } from '@nestjs/common';
import { RepaymentController } from './repayment.controller';
import { RepaymentService } from './repayment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repayment } from './repayment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Repayment])],
  controllers: [RepaymentController],
  providers: [RepaymentService],
})
export class RepaymentModule {}
