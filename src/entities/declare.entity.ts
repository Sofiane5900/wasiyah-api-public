import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Wakil } from './wakil.entity';
import { Death } from './death.entity';

@Entity('DECLARE')
export class Declare {
  @ApiProperty({
    description: 'Identifiant du représentant (Wakil) qui a déclaré le décès',
    type: Number,
    example: 1,
  })
  @PrimaryColumn({ name: 'Id_WAKIL' })
  wakilId: number;

  @ApiProperty({
    description: 'Identifiant de la déclaration de décès concernée',
    type: Number,
    example: 1,
  })
  @PrimaryColumn({ name: 'Id_DEATH' })
  deathId: number;

  @ApiProperty({
    description:
      'Date à laquelle le représentant a validé la déclaration de décès',
    type: Date,
    example: '2025-01-20T14:30:00Z',
  })
  @Column({ name: 'death_validation_date', type: 'timestamp' })
  deathValidationDate: Date;

  @ApiProperty({
    description: 'Représentant (Wakil) qui a effectué la déclaration',
    type: () => Wakil,
  })
  @ManyToOne(() => Wakil, (wakil) => wakil.declarations)
  @JoinColumn({ name: 'Id_WAKIL' })
  wakil: Wakil;

  @ApiProperty({
    description: 'Déclaration de décès concernée par cette validation',
    type: () => Death,
  })
  @ManyToOne(() => Death, (death) => death.declarations)
  @JoinColumn({ name: 'Id_DEATH' })
  death: Death;
}
