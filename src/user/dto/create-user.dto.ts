import {
  IsString,
  IsEmail,
  MinLength,
  IsArray,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: "Le prénom de l'utilisateur",
    type: String,
    minLength: 2,
  })
  @MinLength(2)
  firstName: string;

  @ApiProperty({
    description: "Le nom de l'utilisateur",
    type: String,
    minLength: 2,
  })
  @MinLength(2)
  lastName: string;

  @ApiProperty({
    description: "L'email de l'utilisateur",
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Le mot de passe de l'utilisateur",
    type: String,
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=(.*[A-Z])+)(?=(.*[a-z])+)(?=(.*[\d])+)(?=.*\W)(?!.*\s).{8,}$/, {
    message:
      'Votre mot de passe doit contenir au minimum : 8 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial',
  })
  password: string;

  @ApiProperty({
    description: "Les rôles de l'utilisateur",
    type: [String],
    example: ['ROLE_USER', 'ROLE_ADMIN'],
  })
  @IsArray()
  roles: string[];
}
