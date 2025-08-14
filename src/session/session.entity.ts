import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Musi } from '../musi/musi.entity';

@Entity()
export class Session {
  @ApiProperty({
    description: 'Unique identifier of the session ip connect',
    type: String,
    example: 'd5b3a4c9-72f8-4abf-b98e-d7e5c9bfc33',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Date connected',
    type: Date,
    example: '2025-01-15T10:30:00Z',
  })
  @Column({ type: Date })
  dateTimeStamp: Date;

  @ApiProperty({
    description: 'ip address of the session',
    type: String,
    example: '233.3.2.1.1',
  })
  @Column({ type: String })
  ipAdress: string;

  @ApiProperty({
    description: 'Browser the session was connected from',
    type: String,
    example:
      'Chrome || Firefox || Safari || Edge || Opera || Internet Explorer',
  })
  @Column({ type: String, nullable: true })
  browser: string;

  @ApiProperty({
    description: 'Os the session was connected from',
    type: String,
    example: 'Windows 10 || Linux || MacOS',
  })
  @Column({ type: String, nullable: true })
  os: string;

  @ApiProperty({
    description: 'Device type the session was connected from',
    type: String,
    example: 'Desktop || Mobile || Tablet',
  })
  @Column({ type: String, nullable: true })
  deviceType: string;

  @ApiProperty({
    description: 'Device model the session was connected from',
    type: String,
    example: 'iPhone 16 || Samsung Galaxy S25 || MacBook Pro',
  })
  @Column({ type: 'varchar', nullable: true })
  deviceModel: string;

  @ApiProperty({
    description: 'User associated with this death declaration',
    type: () => Musi,
  })
  @ManyToOne(() => Musi)
  @JoinColumn()
  user: Musi;
}
