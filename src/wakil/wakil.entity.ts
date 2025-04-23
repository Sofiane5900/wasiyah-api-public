import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appoint } from '../appoint/appoint.entity';
import { Declare } from '../declare/declare.entity';

@Entity('WAKIL')
export class Wakil {
  @ApiProperty({
    description: 'Identifiant unique du wakil',
    type: Number,
  })
  @PrimaryGeneratedColumn({ name: 'Id_WAKIL' })
  id: number;

  @ApiProperty({
    description: 'Nom de famille du wakil',
    type: String,
  })
  @Column({ name: 'last_name', length: 50 })
  lastName: string;

  @ApiProperty({
    description: 'Prénom du wakil',
    type: String,
  })
  @Column({ name: 'first_name', length: 50 })
  firstName: string;

  @ApiProperty({
    description: 'Adresse e-mail du wakil',
    type: String,
  })
  @Column({ length: 50 })
  email: string;

  @ApiProperty({
    description: 'Indice de confiance du wakil',
    type: Number,
  })
  @Column({ name: 'trust_score' })
  trustScore: number;

  @ApiProperty({
    description: 'Liste des nominations associées à ce wakil',
    type: () => [Appoint],
  })
  @OneToMany(() => Appoint, (appoint) => appoint.wakil)
  appointments: Appoint[];

  @ApiProperty({
    description: 'Liste des déclarations faites par ce wakil',
    type: () => [Declare],
  })
  @OneToMany(() => Declare, (declare) => declare.wakil)
  declarations: Declare[];
}
