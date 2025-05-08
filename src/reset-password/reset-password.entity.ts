import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Musi } from '../musi/musi.entity';

@Entity()
export class ResetPassword {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => Musi, 'resetPassword')
  musi: Musi;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @ApiProperty()
  @Column({ type: 'varchar', length: 64 })
  token: string;
}
