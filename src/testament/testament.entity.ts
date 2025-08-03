import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Musi } from '../musi/musi.entity';

@Entity()
export class Testament {
  @ApiProperty({
    description: 'Unique identifier of the testament',
    type: String,
    example: 'd5b3a4c9-72f8-4abf-b98e-d7e5c9bfc330',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Content of the testament',
    type: String,
  })
  @Column({ type: String })
  content: string;

  @ApiProperty({
    description: 'Creation date of the testament',
    type: String,
    format: 'date-time',
  })
  @Column({ type: Date })
  creationDate: Date;

  @ApiProperty({
    description: 'Version of the testament',
    type: Number,
  })
  @Column({ type: Number })
  version: number;

  @ApiProperty({
    description: 'Activity status of the testament (active or not)',
    type: Boolean,
  })
  @Column({ type: Boolean, default: false })
  isActive: boolean;

  @ApiProperty({
    description: 'Beneficiary of the testament',
    type: String,
  })
  @Column({ type: String, length: 50 })
  recipient: string;

  @ApiProperty({
    description: 'Relationship with the concerned User',
    type: () => Musi,
  })
  @OneToOne(() => Musi)
  @JoinColumn()
  user: Musi;
}
