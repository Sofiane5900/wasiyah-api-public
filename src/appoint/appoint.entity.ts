import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Wakil } from '../wakil/wakil.entity';
import { ApiProperty } from '@nestjs/swagger';
import { RelationshipType } from '../enum/Relation';

@Entity('appoint')
export class Appoint {
  @ApiProperty({
    description: 'appoint identifier',
    type: String,
    example: 'd5b3a4c9-72f8-4abf-b98e-d7e5c9bfc330',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'designation date',
    type: Date,
    example: '2023-10-01T00:00:00Z',
  })
  @Column({ type: Date })
  designationDate: Date;

  @ApiProperty({
    description: 'relationship type',
    enum: RelationshipType,
    default: RelationshipType.CLOSE_FAMILY,
  })
  @Column({
    type: 'enum',
    enum: RelationshipType,
    default: RelationshipType.CLOSE_FAMILY,
  })
  relation_type: RelationshipType;

  @ApiProperty({
    description: 'number of years of relationship',
    type: Number,
  })
  @Column({ type: Number })
  relationSeniority: number;

  @ApiProperty({
    description: 'if the wakil is validated',
    type: Boolean,
  })
  @Column({ type: Boolean, default: false })
  isValid: boolean;

  @ApiProperty({
    description: 'if revoked',
    type: Boolean,
  })
  @Column({ type: Boolean, default: false })
  isRevoked: boolean;

  @ApiProperty({
    description: 'revocation date',
    type: Date,
    example: '2023-10-01T00:00:00Z',
  })
  @Column({ type: Date, nullable: true })
  revocationDate: Date;

  @ManyToOne(() => User, (User) => User.appointments)
  User: User;

  @ManyToOne(() => Wakil, (wakil) => wakil.appointments)
  wakil: Wakil;
}
