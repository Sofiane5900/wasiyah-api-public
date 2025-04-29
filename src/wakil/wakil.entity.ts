import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appoint } from '../appoint/appoint.entity';
import { Declare } from '../declare/declare.entity';

@Entity()
export class Wakil {
  @ApiProperty({
    description: 'Unique identifier of the wakil',
    type: String,
    example: 'd5b3a4c9-72f8-4abf-b98e-d7e5c9bfc330',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Last name of the wakil',
    type: String,
  })
  @Column({ type: String, length: 50 })
  lastName: string;

  @ApiProperty({
    description: 'First name of the wakil',
    type: String,
  })
  @Column({ type: String, length: 50 })
  firstName: string;

  @ApiProperty({
    description: 'Email address of the wakil',
    type: String,
  })
  @Column({ type: String, length: 50 })
  email: string;

  @ApiProperty({
    description: 'Trust score of the wakil',
    type: Number,
  })
  @Column('int')
  trustScore: number;

  @ApiProperty({
    description: 'List of appointments associated with this wakil',
    type: () => [Appoint],
  })
  @OneToMany(() => Appoint, 'wakil')
  appointments: Appoint[];

  @ApiProperty({
    description: 'List of declarations made by this wakil',
    type: () => [Declare],
  })
  @OneToMany(() => Declare, 'wakil')
  declarations: Declare[];
}
