import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RefreshToken {
  @ApiProperty({
    description: 'identifier of the refresh token',
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'e-mail of the musi',
    type: String,
  })
  // ? Link the Musi entity instead of the email for a proper relation
  @Column({ type: String })
  email: string;

  @ApiProperty({
    description: 'creation timestamp of the refresh token',
    type: Date,
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'expiration timestamp of the refresh token',
    type: Date,
  })
  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  @ApiProperty({
    description: 'encrypted refresh token (AES hex key of 256 bits length)',
    type: String,
  })
  @Column({ type: 'varchar', length: 64, unique: true })
  token: string;
}
