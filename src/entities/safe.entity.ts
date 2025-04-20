import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Musi } from './musi.entity';
import { Document } from './document.entity';

@Entity('SAFE')
export class Safe {
  @PrimaryGeneratedColumn({ name: 'Id_COFFRE' })
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  type: string;

  @Column({ name: 'encrypted_content', length: 50 })
  encryptedContent: string;

  @Column({ name: 'Id_MUSI' })
  musiId: number;

  @ManyToOne(() => Musi, (musi) => musi.id)
  @JoinColumn({ name: 'Id_MUSI' })
  musi: Musi;

  @OneToMany(() => Document, (document) => document.safe)
  documents: Document[];
}
