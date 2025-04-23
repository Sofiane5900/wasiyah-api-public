import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Testament } from '../testament/testament.entity';
import { Appoint } from '../appoint/appoint.entity';
import { Death } from '../death/death.entity';
import { Loan } from '../loan/loan.entity';
import { PosthumousMessage } from '../posthumous-message/posthumous_mesage.entity';
import { Safe } from '../safe/safe.entity';

@Entity()
export class User {
  @ApiProperty({
    description: "id de l'utilisateur",
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Le prénom de l'utilisateur",
    type: String,
  })
  @Column('varchar', { length: 50 })
  firstName: string;

  @ApiProperty({
    description: "Le nom de l'utilisateur",
    type: String,
  })
  @Column('varchar', { length: 50 })
  lastName: string;

  @ApiProperty({
    description: "L'email de l'utilisateur",
    type: String,
  })
  @Column('varchar', { unique: true, length: 50 })
  email: string;

  @ApiProperty({
    description: "Le mot de passe de l'utilisateur",
    type: String,
  })
  @Column('varchar')
  password: string;

  @ApiProperty({
    description: 'date de naissance',
    type: [String],
  })
  @Column({ name: 'birth_date', length: 50 })
  birthDate: string;

  @ApiProperty({
    description: 'date de création',
    type: [String],
  })
  @Column({ name: 'creation_date', type: 'timestamp' })
  creationDate: Date;

  @ApiProperty({
    description: 'Authentification 2FA',
    type: [Boolean],
  })
  @Column({ name: 'two_factor_enabled_', default: false })
  twoFactorEnabled: boolean;

  @ApiProperty({
    description: 'status',
    type: [String],
  })
  @Column({ length: 50 })
  status: string;

  @ApiProperty({
    description: 'Dons organes',
    type: [Boolean],
  })
  @Column({ name: 'organDonor', default: false })
  organDonor: boolean;

  @ApiProperty({
    description: "Les rôles de l'utilisateur",
    type: [String],
    example: ['ROLE_USER', 'ROLE_ADMIN'],
  })
  @Column('simple-array', { default: ['ROLE_USER'] })
  roles: string[];

  @OneToMany(
    () => PosthumousMessage,
    (posthumousMessage) => posthumousMessage.User,
  )
  posthumousMessages: PosthumousMessage[];

  @OneToOne(() => Death, (death) => death.User)
  death: Death;

  @OneToMany(() => Safe, (safe) => safe.User)
  safes: Safe[];

  @OneToMany(() => Loan, (loan) => loan.User)
  loans: Loan[];

  @OneToOne(() => Testament, (testament) => testament.User)
  testament: Testament;

  @OneToMany(() => Appoint, (appoint) => appoint.User)
  appointments: Appoint[];
}
