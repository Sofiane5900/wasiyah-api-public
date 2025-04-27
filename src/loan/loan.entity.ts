import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Repayment } from '../repayment/repayment.entity';

@Entity('loan')
export class Loan {
  @ApiProperty({
    description: 'Unique identifier of the loan',
    type: String,
    example: 'd5b3a4c9-72f8-4abf-b98e-d7e5c9bfc330',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nature or purpose of the loan',
    type: String,
    example: 'Real Estate',
  })
  @Column({ type: String, length: 50 })
  nature: string;

  @ApiProperty({
    description: 'Name of the creditor who granted the loan',
    type: String,
    example: 'National Bank',
  })
  @Column({ type: String, length: 50 })
  creditorName: string;

  @ApiProperty({
    description: 'Amount of the loan',
    type: Number,
    example: 150000.0,
  })
  @Column({ type: 'numeric', precision: 15, scale: 2 })
  amount: number;

  @ApiProperty({
    description: 'Date when the loan was granted',
    type: Date,
    example: '2024-01-15T10:00:00Z',
  })
  @Column({ type: Date })
  loanDate: Date;

  @ApiProperty({
    description: 'Due date of the loan',
    type: Date,
    example: '2029-01-15T10:00:00Z',
  })
  @Column({ type: Date })
  dueDate: Date;

  @ApiProperty({
    description: 'Indicates if the loan is forgiven in case of borrower death',
    type: Boolean,
    example: false,
  })
  @Column({ type: Boolean })
  forgivenAfterDeath: boolean;

  @ApiProperty({
    description: 'Names of loan witnesses, separated by commas',
    type: String,
    example: 'John Smith, Mary Johnson',
  })
  @Column({ type: String, length: 50 })
  witnesses: string;

  @ApiProperty({
    description: 'URL to the documentary proof of the loan',
    type: String,
    example: '/documents/contracts/loan_12345.pdf',
  })
  @Column({ type: String })
  proofUrl: string;

  @ApiProperty({
    description: 'Indicates if this is a loan or a gift',
    type: Boolean,
    example: true,
  })
  @Column({ type: String })
  isLoan: boolean;

  @ApiProperty({
    description: 'Indicates if the loan object is material or financial',
    type: Boolean,
    example: false,
  })
  @Column({ type: Boolean })
  isMaterial: boolean;

  @ApiProperty({
    description: 'User associated with this loan',
    type: () => User,
  })
  @ManyToOne('User', 'loans')
  user: User;

  @ApiProperty({
    description: 'List of repayments made for this loan',
    type: [Repayment],
  })
  @OneToMany(() => Repayment, (repayment) => repayment.loan)
  repayments: Repayment[];
}
