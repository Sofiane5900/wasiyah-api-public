import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

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
    description: 'Identifiant du Usercien associé',
    type: Number,
  })
  @Column({ name: 'Id_User', unique: true })
  UserId: number;

  @ApiProperty({
    description: 'Relation avec le Usercien concerné',
    type: () => User,
  })
  @OneToOne(() => User, (User) => User.id)
  @JoinColumn({ name: 'Id_User' })
  User: User;
}
