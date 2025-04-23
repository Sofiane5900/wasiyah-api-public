import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Wakil } from '../wakil/wakil.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('appoint')
export class Appoint {
  @ApiProperty({
    description: 'User Id',
    type: Number,
  })
  @PrimaryColumn('uuid')
  UserId: number;

  @ApiProperty({
    description: 'Wakil Id',
    type: Number,
  })
  @PrimaryColumn({ name: 'Id_WAKIL' })
  wakilId: number;

  @ApiProperty({
    description: 'designation date',
    type: Date,
    example: '2023-10-01T00:00:00Z',
  })
  @Column({ name: 'designation_date', type: 'timestamp' })
  designationDate: Date;

  @ApiProperty({
    description: 'relationship type',
    type: String,
    example: 'Family, Friend, etc.',
  })
  @Column({ name: 'relation_type', length: 50 })
  relationType: string;

  @ApiProperty({
    description: 'number of years of relationship',
    type: Number,
  })
  @Column({ name: 'relation_seniority' })
  relationSeniority: number;

  @ApiProperty({
    description: 'if the wakil is validated',
    type: Boolean,
  })
  @Column({ name: 'is_valid', default: false })
  isValid: boolean;

  @ApiProperty({
    description: 'if revoked',
    type: Boolean,
  })
  @Column({ name: 'is_revoked', default: false })
  isRevoked: boolean;

  @ApiProperty({
    description: 'revocation date',
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
