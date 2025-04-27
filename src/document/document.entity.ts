import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Safe } from '../safe/safe.entity';

@Entity('document')
export class Document {
  @ApiProperty({
    description: 'Unique identifier of the document',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'File name of the document',
    type: String,
    example: 'testament_officiel.pdf',
  })
  @Column({ type: String, length: 50 })
  fileName: string;

  // TODO Create enum for this attribute
  @ApiProperty({
    description: 'Type of document (ex: PDF, DOCX, JPG)',
    type: String,
    example: 'PDF',
  })
  @Column({ type: String, length: 10 })
  documentType: string;

  @ApiProperty({
    description: 'Size of the document in megabytes',
    type: Number,
    example: 2,
  })
  @Column({ type: Number })
  sizeMb: number;

  @ApiProperty({
    description: 'Date when the document was added',
    type: Date,
    example: '2025-02-15T09:45:00Z',
  })
  @Column({ type: Date })
  addedDate: Date;

  @ApiProperty({
    description: 'Safe containing this document',
    type: () => Safe,
  })
  @ManyToOne(() => Safe, (safe) => safe.documents)
  safe: Safe;
}
