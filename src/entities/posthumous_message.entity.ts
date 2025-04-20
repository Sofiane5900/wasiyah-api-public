import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Musi } from './musi.entity';

@Entity('POSTHUMOUS_MESSAGE')
export class PosthumousMessage {
  @PrimaryGeneratedColumn({ name: 'Id_POSTHUMOUS_MESSAGE' })
  id: number;

  @Column({ name: 'recipient_email', length: 50 })
  recipientEmail: string;

  @Column({ length: 50 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'creation_date', length: 50 })
  creationDate: string;

  @Column({ name: 'opened_after_death' })
  openedAfterDeath: boolean;

  @Column({ name: 'attachment_count' })
  attachmentCount: number;

  @Column({ name: 'Id_MUSI' })
  musiId: number;

  @ManyToOne(() => Musi, (musi) => musi.id)
  @JoinColumn({ name: 'Id_MUSI' })
  musi: Musi;
}
