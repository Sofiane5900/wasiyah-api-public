import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Musi } from './musi.entity';
import { Declare } from './declare.entity';

@Entity('DEATH')
export class Death {
  @PrimaryGeneratedColumn({ name: 'Id_DEATH' })
  id: number;

  @Column({ name: 'validation_status', length: 50 })
  validationStatus: string;

  @Column()
  contestation: boolean;

  @Column({ name: 'declaration_date', type: 'timestamp' })
  declarationDate: Date;

  @Column({ name: 'Id_MUSI', unique: true })
  musiId: number;

  @OneToOne(() => Musi, (musi) => musi)
  @JoinColumn({ name: 'Id_MUSI' })
  musi: Musi;

  @OneToMany(() => Declare, (declare) => declare.death)
  declarations: Declare[];
}
