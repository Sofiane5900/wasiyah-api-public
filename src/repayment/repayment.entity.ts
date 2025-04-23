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
    description: 'Identifiant unique du remboursement',
    type: Number,
    example: 1,
  })
  @PrimaryGeneratedColumn({ name: 'Id_REPAYMENT' })
  id: number;

  @ApiProperty({
    description: 'Montant du remboursement',
    type: Number,
    example: 500,
  })
  @Column()
  amount: number;

  @ApiProperty({
    description: 'Date à laquelle le remboursement a été effectué',
    type: Date,
    example: '2025-03-15T14:30:00Z',
  })
  @Column({ name: 'repayment_date', type: 'timestamp' })
  repaymentDate: Date;

  @ApiProperty({
    description: 'URL vers la preuve du remboursement',
    type: String,
    example: '/documents/preuves/remboursement_12345.pdf',
  })
  @Column({ name: 'proof_url', length: 50 })
  proofUrl: string;

  @ApiProperty({
    description: 'Identifiant du prêt associé à ce remboursement',
    type: Number,
    example: 42,
  })
  @Column({ name: 'Id_LOAN' })
  loanId: number;

  @ApiProperty({
    description: 'Prêt associé à ce remboursement',
    type: () => Loan,
  })
  @ManyToOne(() => Loan, (loan) => loan.repayments)
  @JoinColumn({ name: 'Id_LOAN' })
  loan: Loan;
}
