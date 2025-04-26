import { Entity, Column, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Appoint } from '../appoint/appoint.entity';
import { Death } from '../death/death.entity';
import { Loan } from '../loan/loan.entity';
import { PosthumousMessage } from '../posthumous-message/posthumous_mesage.entity';
import { Safe } from '../safe/safe.entity';
import { RoleUser } from '../enum/Roles';
import { StatusUser } from '../enum/User';
import { Testament } from '../testament/testament.entity';
@Entity('user')
export class User {
  @ApiProperty({
    description: 'identifier of the user',
    type: String,
  })
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({
    description: "User's first name",
    type: String,
  })
  @Column({ length: 50 })
  firstName: string;

  @ApiProperty({
    description: "User's last name",
    type: String,
  })
  @Column({ length: 50 })
  lastName: string;

  @ApiProperty({
    description: "User's email",
    type: String,
  })
  @Column({ unique: true, length: 50 })
  email: string;

  @ApiProperty({
    description: "User's password",
    type: String,
  })
  @Column({ length: 50 })
  password: string;

  @ApiProperty({
    description: 'birth date',
    type: Date,
  })
  @Column()
  birthDate: Date;

  @ApiProperty({
    description: 'creation date',
    type: Date,
  })
  @Column()
  creationDate: Date;

  @ApiProperty({
    description: '2FA Authentication',
    type: [Boolean],
  })
  @Column({ default: false })
  twoFactorEnabled: boolean;

  @ApiProperty({
    description: 'is email verified',
    type: [Boolean],
  })
  @Column({ default: false })
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
    type: [Boolean],
  })
  @Column({ default: false })
  organDonor: boolean;

  @ApiProperty({
    description: "User's roles",
    type: [String],
    example: ['ROLE_USER', 'ROLE_ADMIN'],
  })
  @Column({ type: 'enum', enum: RoleUser, default: RoleUser.ROLE_USER })
  roles: RoleUser;

  @OneToMany(
    () => PosthumousMessage,
    (posthumousMessage) => posthumousMessage.User,
  )
  posthumousMessages: PosthumousMessage[];

  @OneToOne(() => Death, (death) => death.user)
  death: Death;

  @OneToMany(() => Safe, (safe) => safe.User)
  safes: Safe[];

  @OneToMany(() => Loan, (loan) => loan.User)
  loans: Loan[];

  @OneToOne(() => Testament, (testament) => testament.user)
  testament: Testament;

  @OneToMany(() => Appoint, (appoint) => appoint.User)
  appointments: Appoint[];
}
