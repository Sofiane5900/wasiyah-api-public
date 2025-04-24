import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Document } from '../document/document.entity';
import { TypeSafe } from '../enum/Roles';
@Entity('safe')
export class Safe {
  @ApiProperty({
    description: 'Unique identifier of the digital safe',
    type: Number,
    example: 1,
  })
  @PrimaryColumn('uuid')
  id: number;

  @ApiProperty({
    description: 'Name of the safe',
    type: String,
    example: 'Important documents',
  })
  @Column({ length: 50 })
  name: string;

  @ApiProperty({
    description: 'Type enum of safe (personal, professional, family, etc.)',
    enum: TypeSafe,
    default: TypeSafe,
  })
  @Column({
    type: 'enum',
    enum: TypeSafe,
    default: TypeSafe.FAMILY,
  })
  type: TypeSafe;

  @ApiProperty({
    description: 'Encrypted content of the safe or encryption key',
    type: String,
    example: 'a1b2c3d4e5f6g7h8i9j0',
  })
  @Column({ length: 50 })
  encryptedContent: string;

  @ApiProperty({
    description: 'User ID of the safe owner',
    type: Number,
    example: 42,
  })
  @Column()
  UserId: number;

  @ApiProperty({
    description: 'User who owns the safe',
    type: () => User,
  })
  @ManyToOne(() => User, (User) => User.id)
  @JoinColumn()
  User: User;

  @ApiProperty({
    description: 'List of documents stored in this safe',
    type: [Document],
  })
  @OneToMany(() => Document, (document) => document.safe)
  documents: Document[];
}
