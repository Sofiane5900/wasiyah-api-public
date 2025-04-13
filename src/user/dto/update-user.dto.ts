import { IsString, IsOptional, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
