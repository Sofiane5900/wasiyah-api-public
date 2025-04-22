import { IsString, IsOptional, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UniqueEntity } from '../../common/validator/unique-entity.validator';
import { User } from '../user.entity';

export class UpdateUserDto {
  @ApiProperty({
    description: "Le prénom de l'utilisateur",
    type: String,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    description: "Le nom de l'utilisateur",
    type: String,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: "L'email de l'utilisateur",
    type: String,
  })
  @IsOptional()
  @IsEmail()
  @UniqueEntity(User, 'email', { message: 'Cet email à déjà un compte' })
  email?: string;

  @ApiProperty({
    description: "Le mot de passe de l'utilisateur",
    type: String,
    minLength: 8,
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;
}
