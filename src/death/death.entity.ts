import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Declare } from '../declare/declare.entity';
@Entity('death')
export class Death {
  @ApiProperty({
    description: 'Unique identifier of the death declaration',
    type: Number,
    example: 1,
  })
  @PrimaryColumn('uuid')
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
  @JoinColumn()
  User: User;

  @ApiProperty({
    description: 'List of declarations made by Wakils regarding this death',
    type: [Declare],
  })
  @OneToMany(() => Declare, (declare) => declare.death)
  declarations: Declare[];
}
