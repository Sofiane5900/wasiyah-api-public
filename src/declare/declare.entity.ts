import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Wakil } from '../wakil/wakil.entity';
import { Death } from '../death/death.entity';
@Entity('DECLARE')
export class Declare {
  @ApiProperty({
    description:
      'Identifier of the representative (Wakil) who declared the death',
    type: Number,
    example: 1,
  })
  @PrimaryColumn({ name: 'Id_WAKIL' })
  wakilId: number;
  @ApiProperty({
    description: 'Identifier of the concerned death declaration',
    type: Number,
    example: 1,
  })
  @PrimaryColumn({ name: 'Id_DEATH' })
  deathId: number;
  @ApiProperty({
    description: 'Date when the representative validated the death declaration',
    type: Date,
    example: '2025-01-20T14:30:00Z',
  })
  @Column({ name: 'death_validation_date', type: 'timestamp' })
  deathValidationDate: Date;
  @ApiProperty({
    description: 'Representative (Wakil) who made the declaration',
    type: () => Wakil,
  })
  @ManyToOne(() => Wakil, (wakil) => wakil.declarations)
  @JoinColumn({ name: 'Id_WAKIL' })
  wakil: Wakil;
  @ApiProperty({
    description: 'Death declaration concerned by this validation',
    type: () => Death,
  })
  @ManyToOne(() => Death, (death) => death.declarations)
  @JoinColumn({ name: 'Id_DEATH' })
  death: Death;
}
