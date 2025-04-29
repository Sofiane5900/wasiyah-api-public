import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Musi } from '../musi/musi.entity';

@Entity()
export class PosthumousMessage {
  @ApiProperty({
    description: 'Unique identifier of the posthumous message',
    type: String,
    example: 'd5b3a4c9-72f8-4abf-b98e-d7e5c9bfc330',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Email address of the posthumous message recipient',
    type: String,
    example: 'recipient@example.com',
  })
  @Column({ type: String, length: 50 })
  recipientEmail: string;

  @ApiProperty({
    description: 'Title of the posthumous message',
    type: String,
    example: 'My last wishes',
  })
  @Column({ type: String, length: 50 })
  title: string;

  @ApiProperty({
    description: 'Text content of the posthumous message',
    type: String,
    example: 'I wanted to tell you...',
  })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({
    description: 'Creation date of the posthumous message',
    type: String,
    example: '2025-01-15',
  })
  @Column({ type: Date })
  creationDate: Date;

  @ApiProperty({
    description: 'Indicates if the message has been opened after death',
    type: Boolean,
    example: false,
  })
  @Column({ type: Boolean })
  openedAfterDeath: boolean;

  @ApiProperty({
    description: 'Number of attachments associated with the message',
    type: Number,
    example: 2,
  })
  @Column({ type: Number })
  attachmentCount: number;

  @ApiProperty({
    description: 'User who authored the posthumous message',
    type: () => Musi,
  })
  @ManyToOne(() => Musi, 'posthumousMessages')
  user: Musi;
}
