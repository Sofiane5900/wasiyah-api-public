import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Musi } from './musi.entity';

@Entity('TESTAMENT')
export class Testament {
  @PrimaryGeneratedColumn({ name: 'Id_TESTAMENT' })
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'creation_date', type: 'timestamp' })
  creationDate: Date;

  @Column()
  version: number;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ length: 50 })
  recipient: string;

  @Column({ name: 'Id_MUSI', unique: true })
  musiId: number;

  @OneToOne(() => Musi, (musi) => musi.id)
  @JoinColumn({ name: 'Id_MUSI' })
  musi: Musi;
}
