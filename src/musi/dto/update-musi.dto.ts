import {
  IsString,
  IsOptional,
  IsEmail,
  MinLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UniqueEntity } from '../../common/validator/unique-entity.validator';
import { Musi } from '../musi.entity';

export class UpdateMusiDto {
  @ApiProperty({
    description: "The user's first name",
    type: String,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    description: "The user's last name",
    type: String,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: "The user's email address",
    type: String,
  })
  @IsOptional()
  @IsEmail()
  @UniqueEntity(Musi, 'email', {
    message: 'This email is already associated with an account',
  })
  email?: string;

  @ApiProperty({
    description: "The user's password",
    type: String,
    minLength: 8,
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=(.*[A-Z])+)(?=(.*[a-z])+)(?=(.*[\d])+)(?=.*\W)(?!.*\s).{8,}$/, {
    message:
      'Votre mot de passe doit contenir au minimum : 8 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial',
  })
  password?: string;
}
