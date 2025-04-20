import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Wakil } from './wakil.entity';
import { Death } from './death.entity';

@Entity('DECLARE')
export class Declare {
  @PrimaryColumn({ name: 'Id_WAKIL' })
  wakilId: number;

  @PrimaryColumn({ name: 'Id_DEATH' })
  deathId: number;

  @Column({ name: 'death_validation_date', type: 'timestamp' })
  deathValidationDate: Date;

  @ManyToOne(() => Wakil, (wakil) => wakil.declarations)
  @JoinColumn({ name: 'Id_WAKIL' })
  wakil: Wakil;

  @ManyToOne(() => Death, (death) => death.declarations)
  @JoinColumn({ name: 'Id_DEATH' })
  death: Death;
}
