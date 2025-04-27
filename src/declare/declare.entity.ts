import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Wakil } from '../wakil/wakil.entity';
import { Death } from '../death/death.entity';

@Entity('declare')
export class Declare {
  @ApiProperty({
    description:
      'Identifier of the representative (Wakil) who declared the death',
    type: String,
    example: 1,
  })
  @PrimaryColumn('uuid')
  wakilId: string;

  @ApiProperty({
    description: 'Identifier of the concerned death declaration',
    type: String,
    example: '2d2f3c4-5e6b-7a8d-9b0c-1a2b3c4d5e6f',
  })
  @PrimaryColumn('uuid')
  deathId: string;

  @ApiProperty({
    description: 'Date when the representative validated the death declaration',
    type: Date,
    example: '2025-01-20T14:30:00Z',
  })
  @Column()
  deathValidationDate: Date;

  @ApiProperty({
    description: 'Representative (Wakil) who made the declaration',
    type: () => Wakil,
  })
  @ManyToOne(() => Wakil, (wakil) => wakil.declarations)
  @JoinColumn([{ name: 'wakilId', referencedColumnName: 'id' }])
  wakil: Wakil;

  @ApiProperty({
    description: 'Death declaration concerned by this validation',
    type: () => Death,
  })
  @ManyToOne(() => Death, (death) => death.declaration, { eager: false })
  @JoinColumn([{ name: 'deathId', referencedColumnName: 'id' }])
  death: Death;
}
