import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Wakil } from '../wakil/wakil.entity';
import { ApiProperty } from '@nestjs/swagger';
import { RelationshipType } from '../enum/Roles';

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
  @PrimaryColumn('uuid')
  wakilId: number;

  @ApiProperty({
    description: 'designation date',
    type: Date,
    example: '2023-10-01T00:00:00Z',
  })
  @Column({ type: 'timestamp' })
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
  @Column()
  relationSeniority: number;

  @ApiProperty({
    description: 'if the wakil is validated',
    type: Boolean,
  })
  @Column({ default: false })
  isValid: boolean;

  @ApiProperty({
    description: 'if revoked',
    type: Boolean,
  })
  @Column({ default: false })
  isRevoked: boolean;

  @ApiProperty({
    description: 'revocation date',
    type: Date,
    example: '2023-10-01T00:00:00Z',
  })
  @Column({ type: 'timestamp', nullable: true })
  revocationDate: Date;

  @ManyToOne(() => User, (User) => User.appointments)
  @JoinColumn({ name: 'Id_User' })
  User: User;

  @ManyToOne(() => Wakil, (wakil) => wakil.appointments)
  @JoinColumn({ name: 'Id_WAKIL' })
  wakil: Wakil;
}
