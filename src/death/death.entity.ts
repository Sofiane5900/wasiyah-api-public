import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Declare } from '../declare/declare.entity';

@Entity('death')
export class Death {
  @ApiProperty({
    description: 'Unique identifier of the death declaration',
    type: String,
    example: 'd5b3a4c9-72f8-4abf-b98e-d7e5c9bfc330\n',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Validation status of the death declaration',
    type: String,
    example: 'Pending',
  })
  @Column({ length: 50, type: String })
  validationStatus: string;

  @ApiProperty({
    description: 'Indicates if the death declaration is being contested',
    type: Boolean,
    example: false,
  })
  @Column({ default: false, type: Boolean })
  contestation: boolean;

  @ApiProperty({
    description: 'Date when the death declaration was made',
    type: Date,
    example: '2025-01-15T10:30:00Z',
  })
  @Column({ type: Date })
  declarationDate: Date;

  @ApiProperty({
    description: 'User associated with this death declaration',
    type: () => User,
  })
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ApiProperty({
    description: 'Declaration made by Wakil for this death',
    type: () => Declare,
  })
  @OneToMany(() => Declare, (declaration) => declaration.death)
  declarations: Declare[];
}
