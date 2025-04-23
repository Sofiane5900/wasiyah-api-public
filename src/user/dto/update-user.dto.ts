import { IsString, IsOptional, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UniqueEntity } from '../../common/validator/unique-entity.validator';
import { User } from '../user.entity';

export class UpdateUserDto {
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
  @UniqueEntity(User, 'email', {
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
  password?: string;
}
