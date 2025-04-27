import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Wakil } from '../wakil/wakil.entity';
import { Death } from '../death/death.entity';
import 'reflect-metadata';

@Entity('declare')
export class Declare {
  @ApiProperty({
    description:
      'Identifier of the representative (Wakil) who declared the death',
    type: String,
    example: 'd5b3a4c9-72f8-4abf-b98e-d7e5c9bfc330',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Date when the representative validated the death declaration',
    type: Date,
    example: '2025-01-20T14:30:00Z',
  })
  @Column({ type: Date })
  deathValidationDate: Date;

  @ApiProperty({
    description: 'Representative (Wakil) who made the declaration',
    type: () => Wakil,
  })
  @ManyToOne(() => Wakil, (wakil) => wakil.declarations)
  wakil: Wakil;

  @ApiProperty({
    description: 'Death declaration concerned by this validation',
    type: () => Death,
  })
  @ManyToOne(() => Death, (death) => death.declarations)
  death: Death;
}
