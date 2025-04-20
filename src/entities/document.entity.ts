import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Safe } from './safe.entity';

@Entity('DOCUMENT')
export class Document {
  @PrimaryGeneratedColumn({ name: 'Id_DOCUMENT' })
  id: number;

  @Column({ name: 'file_name', length: 50 })
  fileName: string;

  @Column({ name: 'document_type', length: 50 })
  documentType: string;

  @Column({ name: 'size_mb', type: 'numeric', precision: 15, scale: 2 })
  sizeMb: number;

  @Column({ name: 'added_date', type: 'timestamp' })
  addedDate: Date;

  @Column({ name: 'Id_COFFRE' })
  safeId: number;

  @ManyToOne(() => Safe, (safe) => safe.documents)
  @JoinColumn({ name: 'Id_COFFRE' })
  safe: Safe;
}
