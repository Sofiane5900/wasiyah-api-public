import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
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

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Retrieve all users with search
  @Get()
  @Roles('ROLE_ADMIN')
  @UseGuards(RolesGuard)
  @ApiGetResource(User, true)
  async findAll(@Query() query: QueryUserDto): Promise<User[]> {
    return this.userService.findAll(query);
  }

  // Retrieve a user by ID
  @Get(':id')
  @ApiGetResource(User)
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  // Create a user
  @Post()
  @ApiPostRessource(UserResponseDto)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  // Update a user
  @Patch(':id')
  @ApiPatchRessource(User)
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  // Delete a user
  @Delete(':id')
  @ApiDeleteRessource(User)
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
