export class AppointEntity {}
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Wakil } from '../wakil/wakil.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('APPOINT')
export class Appoint {
  @ApiProperty({
    description: 'Id User',
    type: Number,
  })
  @PrimaryColumn({ name: 'Id_User' })
  UserId: number;

  @ApiProperty({
    description: 'Id Wakil',
    type: Number,
  })
  @PrimaryColumn({ name: 'Id_WAKIL' })
  wakilId: number;

  @ApiProperty({
    description: 'date de désignation',
    type: Date,
    example: '2023-10-01T00:00:00Z',
  })
  @Column({ name: 'designation_date', type: 'timestamp' })
  designationDate: Date;

  @ApiProperty({
    description: 'type de relation',
    type: String,
    example: 'Famille, Ami, etc.',
  })
  @Column({ name: 'relation_type', length: 50 })
  relationType: string;

  @ApiProperty({
    description: 'nombre d’années de relation',
    type: Number,
  })
  @Column({ name: 'relation_seniority' })
  relationSeniority: number;

  @ApiProperty({
    description: 'si le wakil est validé',
    type: Boolean,
  })
  @Column({ name: 'is_valid', default: false })
  isValid: boolean;

  @ApiProperty({
    description: 'si revoqué',
    type: Boolean,
  })
  @Column({ name: 'is_revoked', default: false })
  isRevoked: boolean;

  @ApiProperty({
    description: 'date de révocation',
    type: String,
    example: '2023-10-01T00:00:00Z',
  })
  @Column({ name: 'revocation_date', length: 50 })
  revocationDate: string;

  @ManyToOne(() => User, (User) => User.appointments)
  @JoinColumn({ name: 'Id_User' })
  User: User;

  @ManyToOne(() => Wakil, (wakil) => wakil.appointments)
  @JoinColumn({ name: 'Id_WAKIL' })
  wakil: Wakil;
}
