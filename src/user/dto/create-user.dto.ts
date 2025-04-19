import { IsString, IsEmail, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';
import { UniqueEntity } from '../../common/validator/unique-entity.validator';

export class CreateUserDto {
  @ApiProperty({
    description: "Le prénom de l'utilisateur",
    type: String,
    minLength: 2,
  })
  @MinLength(2, {
    message: 'Votre prénom doit contenir au minimum deux caractères',
  })
  firstName: string;

  @ApiProperty({
    description: "Le nom de l'utilisateur",
    type: String,
    minLength: 2,
  })
  @MinLength(2, {
    message: 'Votre nom doit contenir au minimum deux caractères',
  })
  lastName: string;

  @ApiProperty({
    description: "L'email de l'utilisateur",
    type: String,
  })
  @IsEmail({}, { message: "L'email n'est pas valide" })
  @UniqueEntity(User, 'email', { message: 'Cet email à déjà un compte' })
  email: string;

  @ApiProperty({
    description: "Le mot de passe de l'utilisateur",
    type: String,
    minLength: 8,
    example: '9Mv4Ap18-kl!',
  })
  @IsString()
  @Matches(/^(?=(.*[A-Z])+)(?=(.*[a-z])+)(?=(.*[\d])+)(?=.*\W)(?!.*\s).{8,}$/, {
    message:
      'Votre mot de passe doit contenir au minimum : 8 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial',
  })
  password: string;

  @ApiProperty({
    description: "Roles de l'utilisateur",
    type: Array,
    example: ['ROLE_USER'],
  })
  roles: string[];
}
