import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    description: "id de l'utilisateur",
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Le prénom de l'utilisateur",
    type: String,
  })
  @Column('varchar')
  firstName: string;

  @ApiProperty({
    description: "Le nom de l'utilisateur",
    type: String,
  })
  @Column('varchar')
  lastName: string;

  @ApiProperty({
    description: "L'email de l'utilisateur",
    type: String,
  })
  @Column('varchar', { unique: true })
  email: string;

  @ApiProperty({
    description: "Vérification email de l'utilisateur",
    type: Boolean,
  })
  @Column({ type: 'bool', default: 'false' })
  isEmailVerified: boolean;

  @ApiProperty({
    description: "Le mot de passe de l'utilisateur",
    type: String,
  })
  @Column('varchar')
  password: string;

  @ApiProperty({
    description: "Les rôles de l'utilisateur",
    type: [String],
    example: ['ROLE_USER', 'ROLE_ADMIN'],
  })
  @Column('simple-array', { default: ['ROLE_USER'] })
  roles: string[];
}
