import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
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
  password: string;
}
