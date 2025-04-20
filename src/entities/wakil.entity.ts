import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appoint } from './appoint.entity';
import { Declare } from './declare.entity';

@Entity('WAKIL')
export class Wakil {
  @PrimaryGeneratedColumn({ name: 'Id_WAKIL' })
  id: number;

  @Column({ name: 'last_name', length: 50 })
  lastName: string;

  @Column({ name: 'first_name', length: 50 })
  firstName: string;

  @Column({ length: 50 })
  email: string;

  @Column({ name: 'trust_score' })
  trustScore: number;

  @OneToMany(() => Appoint, (appoint) => appoint.wakil)
  appointments: Appoint[];

  @OneToMany(() => Declare, (declare) => declare.wakil)
  declarations: Declare[];
}
