import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Loan } from './loan.entity';

@Entity('REPAYMENT')
export class Repayment {
  @PrimaryGeneratedColumn({ name: 'Id_REPAYMENT' })
  id: number;

  @Column()
  amount: number;

  @Column({ name: 'repayment_date', type: 'timestamp' })
  repaymentDate: Date;

  @Column({ name: 'proof_url', length: 50 })
  proofUrl: string;

  @Column({ name: 'Id_LOAN' })
  loanId: number;

  @ManyToOne(() => Loan, (loan) => loan.repayments)
  @JoinColumn({ name: 'Id_LOAN' })
  loan: Loan;
}
