import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Musi } from './musi.entity';
import { Repayment } from './repayment.entity';

@Entity('LOAN')
export class Loan {
  @PrimaryGeneratedColumn({ name: 'Id_LOAN' })
  id: number;

  @Column({ length: 50 })
  nature: string;

  @Column({ name: 'creditor_name', length: 50 })
  creditorName: string;

  @Column({ type: 'numeric', precision: 15, scale: 2 })
  amount: number;

  @Column({ name: 'loan_date', type: 'timestamp' })
  loanDate: Date;

  @Column({ name: 'due_date', type: 'timestamp' })
  dueDate: Date;

  @Column({ name: 'forgiven_after_death' })
  forgivenAfterDeath: boolean;

  @Column({ length: 50 })
  witnesses: string;

  @Column({ name: 'proof_url', length: 50 })
  proofUrl: string;

  @Column({ name: 'is_loan' })
  isLoan: boolean;

  @Column({ name: 'is_material' })
  isMaterial: boolean;

  @Column({ name: 'Id_MUSI' })
  musiId: number;

  @ManyToOne(() => Musi, (musi) => musi.id)
  @JoinColumn({ name: 'Id_MUSI' })
  musi: Musi;

  @OneToMany(() => Repayment, (repayment) => repayment.loan)
  repayments: Repayment[];
}
