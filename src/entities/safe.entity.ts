import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Musi } from './musi.entity';
import { Document } from './document.entity';

@Entity('SAFE')
export class Safe {
  @ApiProperty({
    description: "Identifiant unique du coffre-fort numérique",
    type: Number,
    example: 1
  })
  @PrimaryGeneratedColumn({ name: 'Id_COFFRE' })
  id: number;

  @ApiProperty({
    description: "Nom du coffre-fort",
    type: String,
    example: "Documents importants"
  })
  @Column({ length: 50 })
  name: string;

  @ApiProperty({
    description: "Type de coffre-fort (personnel, professionnel, familial, etc.)",
    type: String,
    example: "Personnel"
  })
  @Column({ length: 50 })
  type: string;

  @ApiProperty({
    description: "Contenu chiffré du coffre-fort ou clé de chiffrement",
    type: String,
    example: "a1b2c3d4e5f6g7h8i9j0"
  })
  @Column({ name: 'encrypted_content', length: 50 })
  encryptedContent: string;

  @ApiProperty({
    description: "Identifiant de l'utilisateur propriétaire du coffre-fort",
    type: Number,
    example: 42
  })
  @Column({ name: 'Id_MUSI' })
  musiId: number;

  @ApiProperty({
    description: "Utilisateur propriétaire du coffre-fort",
    type: () => Musi
  })
  @ManyToOne(() => Musi, (musi) => musi.id)
  @JoinColumn({ name: 'Id_MUSI' })
  musi: Musi;

  @ApiProperty({
    description: "Liste des documents stockés dans ce coffre-fort",
    type: [Document]
  })
  @OneToMany(() => Document, (document) => document.safe)
  documents: Document[];
}