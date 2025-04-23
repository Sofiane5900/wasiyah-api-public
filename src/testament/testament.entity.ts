import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('TESTAMENT')
export class Testament {
  @ApiProperty({
    description: 'Unique identifier of the testament',
    type: Number,
  })
  @PrimaryGeneratedColumn({ name: 'Id_TESTAMENT' })
  id: number;

  @ApiProperty({
    description: 'Content of the testament',
    type: String,
  })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({
    description: 'Creation date of the testament',
    type: String,
    format: 'date-time',
  })
  @Column({ name: 'creation_date', type: 'timestamp' })
  creationDate: Date;

  @ApiProperty({
    description: 'Version of the testament',
    type: Number,
  })
  @Column()
  version: number;

  @ApiProperty({
    description: 'Activity status of the testament (active or not)',
    type: Boolean,
  })
  @Column({ name: 'is_active' })
  isActive: boolean;

  @ApiProperty({
    description: 'Beneficiary of the testament',
    type: String,
  })
  @Column({ length: 50 })
  recipient: string;

  @ApiProperty({
    description: 'Associated User ID',
    type: Number,
  })
  @Column({ name: 'Id_User', unique: true })
  UserId: number;

  @ApiProperty({
    description: 'Relationship with the concerned User',
    type: () => User,
  })
  @OneToOne(() => User, (User) => User.id)
  @JoinColumn({ name: 'Id_User' })
  User: User;
}
