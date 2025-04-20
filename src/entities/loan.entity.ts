import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Musi } from './musi.entity';
import { Repayment } from './repayment.entity';

@Entity('LOAN')
export class Loan {
  @ApiProperty({
    description: 'Identifiant unique du prêt',
    type: Number,
    example: 1,
  })
  @PrimaryGeneratedColumn({ name: 'Id_LOAN' })
  id: number;

  @ApiProperty({
    description: 'Nature ou objet du prêt',
    type: String,
    example: 'Immobilier',
  })
  @Column({ length: 50 })
  nature: string;

  @ApiProperty({
    description: 'Nom du créancier qui a accordé le prêt',
    type: String,
    example: 'Banque Nationale',
  })
  @Column({ name: 'creditor_name', length: 50 })
  creditorName: string;

  @ApiProperty({
    description: 'Montant du prêt',
    type: Number,
    example: 150000.0,
  })
  @Column({ type: 'numeric', precision: 15, scale: 2 })
  amount: number;

  @ApiProperty({
    description: 'Date à laquelle le prêt a été accordé',
    type: Date,
    example: '2024-01-15T10:00:00Z',
  })
  @Column({ name: 'loan_date', type: 'timestamp' })
  loanDate: Date;

  @ApiProperty({
    description: 'Date déchéance du prêt',
    type: Date,
    example: '2029-01-15T10:00:00Z',
  })
  @Column({ name: 'due_date', type: 'timestamp' })
  dueDate: Date;

  @ApiProperty({
    description: 'Indique si le prêt est annulé en cas de décès de lemprunteur',
    type: Boolean,
    example: false,
  })
  @Column({ name: 'forgiven_after_death' })
  forgivenAfterDeath: boolean;

  @ApiProperty({
    description: 'Noms des témoins du prêt, séparés par des virgules',
    type: String,
    example: 'Jean Dupont, Marie Martin',
  })
  @Column({ length: 50 })
  witnesses: string;

  @ApiProperty({
    description: 'URL vers la preuve documentaire du prêt',
    type: String,
    example: '/documents/contrats/pret_12345.pdf',
  })
  @Column({ name: 'proof_url', length: 50 })
  proofUrl: string;

  @ApiProperty({
    description: 'Indique sil sagit dun prêt ou dun don false',
    type: Boolean,
    example: true,
  })
  @Column({ name: 'is_loan' })
  isLoan: boolean;

  @ApiProperty({
    description: 'Indique si lobjet du prêt est matériel ou financier',
    type: Boolean,
    example: false,
  })
  @Column({ name: 'is_material' })
  isMaterial: boolean;

  @ApiProperty({
    description: 'Identifiant de lutilisateur concerné par ce prêt',
    type: Number,
    example: 42,
  })
  @Column({ name: 'Id_MUSI' })
  musiId: number;

  @ApiProperty({
    description: 'Utilisateur associé à ce prêt',
    type: () => Musi,
  })
  @ManyToOne(() => Musi, (musi) => musi.id)
  @JoinColumn({ name: 'Id_MUSI' })
  musi: Musi;

  @ApiProperty({
    description: 'Liste des remboursements effectués pour ce prêt',
    type: [Repayment],
  })
  @OneToMany(() => Repayment, (repayment) => repayment.loan)
  repayments: Repayment[];
}
