import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Appoint } from '../appoint/appoint.entity';
import { Declare } from '../declare/declare.entity';

@Entity('wakil')
export class Wakil {
  @ApiProperty({
    description: 'Unique identifier of the wakil',
    type: String,
  })
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Last name of the wakil',
    type: String,
  })
  @Column('varchar', { length: 50 })
  lastName: string;

  @ApiProperty({
    description: 'First name of the wakil',
    type: String,
  })
  @Column('varchar', { length: 50 })
  firstName: string;

  @ApiProperty({
    description: 'Email address of the wakil',
    type: String,
  })
  @Column('varchar', { length: 50 })
  email: string;

  @ApiProperty({
    description: 'Trust score of the wakil',
    type: Number,
  })
  @Column('int') // C'est un nombre, donc ici on garde 'int'
  trustScore: number;

  @ApiProperty({
    description: 'List of appointments associated with this wakil',
    type: () => [Appoint],
  })
  @OneToMany(() => Appoint, (appoint) => appoint.wakil)
  appointments: Appoint[];

  @ApiProperty({
    description: 'List of declarations made by this wakil',
    type: () => [Declare],
  })
  @OneToMany(() => Declare, (declare) => declare.wakil)
  declarations: Declare[];
}
