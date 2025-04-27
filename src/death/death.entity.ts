import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Declare } from '../declare/declare.entity';

@Entity('death')
export class Death {
  @ApiProperty({
    description: 'Unique identifier of the death declaration',
    type: String,
    example: 1,
  })
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Validation status of the death declaration',
    type: String,
    example: 'Pending',
  })
  @Column({ length: 50 })
  validationStatus: string;

  @ApiProperty({
    description: 'Indicates if the death declaration is being contested',
    type: Boolean,
    example: false,
  })
  @Column({ default: false })
  contestation: boolean;

  @ApiProperty({
    description: 'Date when the death declaration was made',
    type: Date,
    example: '2025-01-15T10:30:00Z',
  })
  @Column()
  declarationDate: Date;

  @ApiProperty({
    description: 'User ID associated with this death declaration',
    type: Number,
    example: 42,
  })
  @Column({ unique: true })
  UserId: number;

  @ApiProperty({
    description: 'User associated with this death declaration',
    type: () => User,
  })
  @OneToOne(() => User, (user) => user.death)
  @JoinColumn()
  user: User;

  @ApiProperty({
    description: 'Declaration made by Wakil for this death',
    type: () => Declare,
  })
  @OneToOne(() => Declare, (declaration) => declaration.death)
  declaration: Declare;
}
