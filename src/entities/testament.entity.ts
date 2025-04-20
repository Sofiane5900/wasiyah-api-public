import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Musi } from './musi.entity';

@Entity('TESTAMENT')
export class Testament {
  @ApiProperty({
    description: 'Identifiant unique du testament',
    type: Number,
  })
  @PrimaryGeneratedColumn({ name: 'Id_TESTAMENT' })
  id: number;

  @ApiProperty({
    description: 'Contenu du testament',
    type: String,
  })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({
    description: 'Date de création du testament',
    type: String,
    format: 'date-time',
  })
  @Column({ name: 'creation_date', type: 'timestamp' })
  creationDate: Date;

  @ApiProperty({
    description: 'Version du testament',
    type: Number,
  })
  @Column()
  version: number;

  @ApiProperty({
    description: "Statut d'activité du testament (actif ou non)",
    type: Boolean,
  })
  @Column({ name: 'is_active' })
  isActive: boolean;

  @ApiProperty({
    description: 'Bénéficiaire du testament',
    type: String,
  })
  @Column({ length: 50 })
  recipient: string;

  @ApiProperty({
    description: 'Identifiant du musicien associé',
    type: Number,
  })
  @Column({ name: 'Id_MUSI', unique: true })
  musiId: number;

  @ApiProperty({
    description: 'Relation avec le musicien concerné',
    type: () => Musi,
  })
  @OneToOne(() => Musi, (musi) => musi.id)
  @JoinColumn({ name: 'Id_MUSI' })
  musi: Musi;
}
