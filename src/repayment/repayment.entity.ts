import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Loan } from '../loan/loan.entity';
@Entity('REPAYMENT')
export class Repayment {
  @ApiProperty({
    description: 'Unique identifier of the repayment',
    type: Number,
    example: 1,
  })
  @PrimaryGeneratedColumn({ name: 'Id_REPAYMENT' })
  id: number;
  @ApiProperty({
    description: 'Amount of the repayment',
    type: Number,
    example: 500,
  })
  @Column()
  amount: number;
  @ApiProperty({
    description: 'Date when the repayment was made',
    type: Date,
    example: '2025-03-15T14:30:00Z',
  })
  @Column({ name: 'repayment_date', type: 'timestamp' })
  repaymentDate: Date;
  @ApiProperty({
    description: 'URL to the proof of repayment',
    type: String,
    example: '/documents/proofs/repayment_12345.pdf',
  })
  @Column({ name: 'proof_url', length: 50 })
  proofUrl: string;
  @ApiProperty({
    description: 'Identifier of the loan associated with this repayment',
    type: Number,
    example: 42,
  })
  @Column({ name: 'Id_LOAN' })
  loanId: number;
  @ApiProperty({
    description: 'Loan associated with this repayment',
    type: () => Loan,
  })
  @ManyToOne(() => Loan, (loan) => loan.repayments)
  @JoinColumn({ name: 'Id_LOAN' })
  loan: Loan;
}
