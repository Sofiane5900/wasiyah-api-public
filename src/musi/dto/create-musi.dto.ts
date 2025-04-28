import { IsString, IsEmail, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Musi } from '../musi.entity';
import { UniqueEntity } from '../../common/validator/unique-entity.validator';
import { RoleUser } from 'src/enum/Roles';

export class CreateMusiDto {
  @ApiProperty({
    description: "The Musi's first name",
    type: String,
    minLength: 2,
  })
  @MinLength(2, {
    message: 'Your first name must contain at least two characters',
  })
  firstName: string;

  @ApiProperty({
    description: "The Musi's last name",
    type: String,
    minLength: 2,
  })
  @MinLength(2, {
    message: 'Your last name must contain at least two characters',
  })
  lastName: string;

  @ApiProperty({
    description: "The Musi's email address",
    type: String,
  })
  @IsEmail({}, { message: 'The email is not valid' })
  @UniqueEntity(Musi, 'email', {
    message: 'This email is already associated with an account',
  })
  email: string;

  @ApiProperty({
    description: "The Musi's password",
    type: String,
    minLength: 8,
    example: '9Mv4Ap18-kl!',
  })
  @IsString()
  @Matches(/^(?=(.*[A-Z])+)(?=(.*[a-z])+)(?=(.*[\d])+)(?=.*\W)(?!.*\s).{8,}$/, {
    message:
      'Your password must contain at least: 8 characters, 1 uppercase letter, 1 number, and 1 special character',
  })
  password: string;

  @ApiProperty({
    description: "The Musi's roles",
    type: 'string',
    example: ['ROLE_Musi', 'ROLE_ADMIN'],
  })
  roles: RoleUser;
}
