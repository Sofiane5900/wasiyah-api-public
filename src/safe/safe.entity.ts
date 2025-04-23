import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Document } from '../document/document.entity';
@Entity('SAFE')
export class Safe {
  @ApiProperty({
    description: 'Unique identifier of the digital safe',
    type: Number,
    example: 1,
  })
  @PrimaryGeneratedColumn({ name: 'Id_COFFRE' })
  id: number;
  @ApiProperty({
    description: 'Name of the safe',
    type: String,
    example: 'Important documents',
  })
  @Column({ length: 50 })
  name: string;
  @ApiProperty({
    description: 'Type of safe (personal, professional, family, etc.)',
    type: String,
    example: 'Personal',
  })
  @Column({ length: 50 })
  type: string;
  @ApiProperty({
    description: 'Encrypted content of the safe or encryption key',
    type: String,
    example: 'a1b2c3d4e5f6g7h8i9j0',
  })
  @Column({ name: 'encrypted_content', length: 50 })
  encryptedContent: string;
  @ApiProperty({
    description: 'User ID of the safe owner',
    type: Number,
    example: 42,
  })
  @Column({ name: 'Id_User' })
  UserId: number;
  @ApiProperty({
    description: 'User who owns the safe',
    type: () => User,
  })
  @ManyToOne(() => User, (User) => User.id)
  @JoinColumn({ name: 'Id_User' })
  User: User;
  @ApiProperty({
    description: 'List of documents stored in this safe',
    type: [Document],
  })
  @OneToMany(() => Document, (document) => document.safe)
  documents: Document[];
}
