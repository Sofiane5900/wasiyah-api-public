import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Declare } from '../declare/declare.entity';
@Entity('DEATH')
export class Death {
  @ApiProperty({
    description: 'Unique identifier of the death declaration',
    type: Number,
    example: 1,
  })
  @PrimaryGeneratedColumn({ name: 'Id_DEATH' })
  id: number;
  @ApiProperty({
    description: 'Validation status of the death declaration',
    type: String,
    example: 'Pending',
  })
  @Column({ name: 'validation_status', length: 50 })
  validationStatus: string;
  @ApiProperty({
    description: 'Indicates if the death declaration is being contested',
    type: Boolean,
    example: false,
  })
  @Column()
  contestation: boolean;
  @ApiProperty({
    description: 'Date when the death declaration was made',
    type: Date,
    example: '2025-01-15T10:30:00Z',
  })
  @Column({ name: 'declaration_date', type: 'timestamp' })
  declarationDate: Date;
  @ApiProperty({
    description: 'User ID associated with this death declaration',
    type: Number,
    example: 42,
  })
  @Column({ name: 'Id_User', unique: true })
  UserId: number;
  @ApiProperty({
    description: 'User associated with this death declaration',
    type: () => User,
  })
  @OneToOne(() => User, (User) => User)
  @JoinColumn({ name: 'Id_User' })
  User: User;
  @ApiProperty({
    description: 'List of declarations made by Wakils regarding this death',
    type: [Declare],
  })
  @OneToMany(() => Declare, (declare) => declare.death)
  declarations: Declare[];
}
