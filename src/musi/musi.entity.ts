import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Appoint } from '../appoint/appoint.entity';
import { Loan } from '../loan/loan.entity';
import { PosthumousMessage } from '../posthumous-message/posthumous-mesage.entity';
import { Safe } from '../safe/safe.entity';
import { RoleUser } from '../enum/Roles';
import { StatusUser } from '../enum/User';

import { Session } from '../session/session.entity';
import { ResetPassword } from '../reset-password/reset-password.entity';

@Entity()
export class Musi {
  @ApiProperty({
    description: 'identifier of the musi',
    type: String,
    example: 'd5b3a4c9-72f8-4abf-b98e-d7e5c9bfc330',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Musi first name',
    type: String,
  })
  @Column({ type: String, length: 50 })
  firstName: string;

  @ApiProperty({
    description: 'Musi last name',
    type: String,
  })
  @Column({ type: String, length: 50 })
  lastName: string;

  @ApiProperty({
    description: 'Musi email',
    type: String,
  })
  @Column({ type: String, unique: true })
  email: string;

  @ApiProperty({
    description: 'Musi password',
    type: String,
  })
  @Column({ type: String })
  password: string;

  @ApiProperty({
    description: 'birth date',
    type: Date,
  })
  @Column({ type: Date })
  birthDate: Date;

  @ApiProperty({
    description: 'creation date',
    type: Date,
  })
  @CreateDateColumn({ type: Date })
  creationDate: Date;

  @ApiProperty({
    description: '2FA Authentication',
    type: Boolean,
  })
  @Column({ type: Boolean, default: false })
  twoFactorEnabled: boolean;

  @ApiProperty({
    description: 'is email verified',
    type: Boolean,
  })
  @Column({ type: Boolean, default: false })
  isEmailVerified: boolean;

  @ApiProperty({
    description: 'status',
    type: [String],
  })
  @Column({
    type: 'enum',
    enum: StatusUser,
    default: StatusUser.PENDING,
  })
  status: StatusUser;

  @ApiProperty({
    description: 'Organ donor',
    type: Boolean,
  })
  @Column({ type: Boolean, default: false })
  organDonor: boolean;

  @ApiProperty({
    description: 'Musi roles',
    type: [String],
    example: ['ROLE_USER', 'ROLE_ADMIN'],
  })
  @Column({
    type: 'enum',
    enum: RoleUser,
    array: true,
    default: [RoleUser.ROLE_MUSI],
  })
  roles: RoleUser[];

  @OneToMany(() => PosthumousMessage, 'user')
  posthumousMessages: PosthumousMessage[];

  @OneToMany(() => Safe, 'user')
  safes: Safe[];

  @OneToMany(() => Loan, 'user')
  loans: Loan[];

  @OneToMany(() => Appoint, 'user')
  appointments: Appoint[];

  @OneToMany(() => Session, 'user')
  sessions: Session[];

  @OneToMany(() => ResetPassword, 'musi')
  resetPassword: ResetPassword[];
}
