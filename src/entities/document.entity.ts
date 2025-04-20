import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Safe } from './safe.entity';

@Entity('DOCUMENT')
export class Document {
  @ApiProperty({
    description: 'Identifiant unique du document',
    type: Number,
    example: 1,
  })
  @PrimaryGeneratedColumn({ name: 'Id_DOCUMENT' })
  id: number;

  @ApiProperty({
    description: 'Nom du fichier du document',
    type: String,
    example: 'testament_officiel.pdf',
  })
  @Column({ name: 'file_name', length: 50 })
  fileName: string;

  @ApiProperty({
    description: 'Type du document (ex: PDF, DOCX, JPG)',
    type: String,
    example: 'PDF',
  })
  @Column({ name: 'document_type', length: 50 })
  documentType: string;

  @ApiProperty({
    description: 'Taille du document en méga-octets',
    type: Number,
    example: 2.45,
  })
  @Column({ name: 'size_mb', type: 'numeric', precision: 15, scale: 2 })
  sizeMb: number;

  @ApiProperty({
    description: "Date d'ajout du document",
    type: Date,
    example: '2025-02-15T09:45:00Z',
  })
  @Column({ name: 'added_date', type: 'timestamp' })
  addedDate: Date;

  @ApiProperty({
    description: 'Identifiant du coffre-fort contenant ce document',
    type: Number,
    example: 3,
  })
  @Column({ name: 'Id_COFFRE' })
  safeId: number;

  @ApiProperty({
    description: 'Coffre-fort contenant ce document',
    type: () => Safe,
  })
  @ManyToOne(() => Safe, (safe) => safe.documents)
  @JoinColumn({ name: 'Id_COFFRE' })
  safe: Safe;
}
