import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Loan } from '../loan/loan.entity';
@Entity('repayement')
export class Repayment {
  @ApiProperty({
    description: 'Unique identifier of the repayment',
    type: String,
    example: '1-dsf-qsff-1234',
  })
  @PrimaryColumn('uuid')
  id: string;

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
  @Column()
  repaymentDate: Date;

  @ApiProperty({
    description: 'URL to the proof of repayment',
    type: String,
    example: '/documents/proofs/repayment_12345.pdf',
  })
  @Column({ length: 50 })
  proofUrl: string;

  @ApiProperty({
    description: 'Identifier of the loan associated with this repayment',
    type: Number,
    example: 42,
  })
  @Column()
  loanId: number;

  @ApiProperty({
    description: 'Loan associated with this repayment',
    type: () => Loan,
  })
  @ManyToOne(() => Loan, (loan) => loan.repayments)
  @JoinColumn()
  loan: Loan;
}
