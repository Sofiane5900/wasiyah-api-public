import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiDeleteRessource,
  ApiGetResource,
  ApiPatchRessource,
  ApiPostRessource,
} from '../openapi/api.decorator';
import { Roles } from '../guards/roles/roles.decorator';
import { RolesGuard } from '../guards/roles/roles.guards';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRepository } from './user.repository';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guards';
import { MailService } from 'src/mail/mail.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  // Récupérer tous les utilisateurs avec recherche
  @Get()
  @Roles('ROLE_ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiGetResource(User, true)
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  // Récupérer un utilisateur par ID
  @Get(':id')
  @ApiGetResource(User)
  async getUser(@Param('id') id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  // Créer un utilisateur
  @Post()
  @ApiPostRessource(UserResponseDto)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.create(createUserDto);
    await this.mailService.sendVerificationEmail(user.email);
    return user;
  }

  // Mettre à jour un utilisateur
  @Patch(':id')
  @ApiPatchRessource(User)
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  // Supprimer un utilisateur
  @Delete(':id')
  @ApiDeleteRessource(User)
  async removeUser(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
