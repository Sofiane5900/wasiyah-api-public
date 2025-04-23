import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Safe } from '../safe/safe.entity';

@Entity('document')
export class Document {
  @ApiProperty({
    description: 'Unique identifier of the document',
    type: Number,
    example: 1,
  })
  @PrimaryColumn({ name: 'Id_DOCUMENT' })
  id: number;

  @ApiProperty({
    description: 'File name of the document',
    type: String,
    example: 'testament_officiel.pdf',
  })
  @Column({ name: 'file_name', length: 50 })
  fileName: string;

  @ApiProperty({
    description: 'Type of document (ex: PDF, DOCX, JPG)',
    type: String,
    example: 'PDF',
  })
  @Column({ name: 'document_type', length: 50 })
  documentType: string;

  @ApiProperty({
    description: 'Size of the document in megabytes',
    type: Number,
    example: 2.45,
  })
  @Column({ name: 'size_mb', type: 'numeric', precision: 15, scale: 2 })
  sizeMb: number;

  @ApiProperty({
    description: 'Date when the document was added',
    type: Date,
    example: '2025-02-15T09:45:00Z',
  })
  @Column({ name: 'added_date', type: 'timestamp' })
  addedDate: Date;

  @ApiProperty({
    description: 'Identifier of the safe containing this document',
    type: Number,
    example: 3,
  })
  @Column({ name: 'Id_COFFRE' })
  safeId: number;

  @ApiProperty({
    description: 'Safe containing this document',
    type: () => Safe,
  })
  @ManyToOne(() => Safe, (safe) => safe.documents)
  @JoinColumn()
  safe: Safe;
}
