import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Loan } from '../loan/loan.entity';

@Entity('repayement')
export class Repayment {
  @ApiProperty({
    description: 'Unique identifier of the repayment',
    type: String,
    example: 'd5b3a4c9-72f8-4abf-b98e-d7e5c9bfc330',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Amount of the repayment',
    type: Number,
    example: 500,
  })
  @Column({ type: 'int' })
  amount: number;

  @ApiProperty({
    description: 'Date when the repayment was made',
    type: Date,
    example: '2025-03-15T14:30:00Z',
  })
  @Column({ type: Date })
  repaymentDate: Date;

  @ApiProperty({
    description: 'URL to the proof of repayment',
    type: String,
    example: '/documents/proofs/repayment_12345.pdf',
  })
  @Column({ type: String, length: 50 })
  proofUrl: string;

  @ApiProperty({
    description: 'Loan associated with this repayment',
    type: () => Loan,
  })
  @ManyToOne(() => Loan, (loan) => loan.repayments)
  loan: Loan;
}
