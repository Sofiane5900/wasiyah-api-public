import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Declare } from '../declare/declare.entity';

@Entity('DEATH')
export class Death {
  @ApiProperty({
    description: 'Identifiant unique de la déclaration de décès',
    type: Number,
    example: 1,
  })
  @PrimaryGeneratedColumn({ name: 'Id_DEATH' })
  id: number;

  @ApiProperty({
    description: 'Statut de validation de la déclaration de décès',
    type: String,
    example: 'En attente',
  })
  @Column({ name: 'validation_status', length: 50 })
  validationStatus: string;

  @ApiProperty({
    description:
      "Indique si la déclaration de décès fait l'objet d'une contestation",
    type: Boolean,
    example: false,
  })
  @Column()
  contestation: boolean;

  @ApiProperty({
    description: 'Date à laquelle la déclaration de décès a été effectuée',
    type: Date,
    example: '2025-01-15T10:30:00Z',
  })
  @Column({ name: 'declaration_date', type: 'timestamp' })
  declarationDate: Date;

  @ApiProperty({
    description:
      "Identifiant de l'utilisateur (User) associé à cette déclaration de décès",
    type: Number,
    example: 42,
  })
  @Column({ name: 'Id_User', unique: true })
  UserId: number;

  @ApiProperty({
    description: 'User associé à cette déclaration de décès',
    type: () => User,
  })
  @OneToOne(() => User, (User) => User)
  @JoinColumn({ name: 'Id_User' })
  User: User;

  @ApiProperty({
    description:
      'Liste des déclarations faites par des Wakils concernant ce décès',
    type: [Declare],
  })
  @OneToMany(() => Declare, (declare) => declare.death)
  declarations: Declare[];
}
