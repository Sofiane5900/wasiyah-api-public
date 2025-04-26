import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Entity('posthumousMessage')
export class PosthumousMessage {
  @ApiProperty({
    description: 'Unique identifier of the posthumous message',
    type: String,
    example: 1,
  })
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Email address of the posthumous message recipient',
    type: String,
    example: 'recipient@example.com',
  })
  @Column({ length: 50 })
  recipientEmail: string;

  @ApiProperty({
    description: 'Title of the posthumous message',
    type: String,
    example: 'My last wishes',
  })
  @Column({ length: 50 })
  title: string;

  @ApiProperty({
    description: 'Text content of the posthumous message',
    type: String,
    example: 'I wanted to tell you...',
  })
  @Column()
  content: string;

  @ApiProperty({
    description: 'Creation date of the posthumous message',
    type: String,
    example: '2025-01-15',
  })
  @Column({ length: 50 })
  creationDate: string;

  @ApiProperty({
    description: 'Indicates if the message has been opened after death',
    type: Boolean,
    example: false,
  })
  @Column()
  openedAfterDeath: boolean;

  @ApiProperty({
    description: 'Number of attachments associated with the message',
    type: Number,
    example: 2,
  })
  @Column()
  attachmentCount: number;

  @ApiProperty({
    description: 'User ID of the posthumous message author',
    type: Number,
    example: 42,
  })
  @Column()
  UserId: number;

  @ApiProperty({
    description: 'User who authored the posthumous message',
    type: () => User,
  })
  @ManyToOne(() => User, (User) => User.id)
  @JoinColumn()
  User: User;
}
