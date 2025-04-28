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
import { UserService } from './musi.service';
import { CreateMusiDto } from './dto/create-musi.dto';
import { UpdateUserDto } from './dto/update-musi.dto';
import { QueryUserDto } from './dto/query-musi.dto';
import { Musi } from './musi.entity';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiDeleteRessource,
  ApiGetResource,
  ApiPatchRessource,
  ApiPostRessource,
} from '../openapi/api.decorator';
import { Roles } from '../guards/roles/roles.decorator';
import { RolesGuard } from '../guards/roles/roles.guards';
import { UserResponseDto } from './dto/musi-response.dto';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guards';
import { MailService } from 'src/mail/mail.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  // Retrieve all users with search
  @Get()
  @Roles('ROLE_ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiGetResource(Musi, true)
  async findAll(@Query() query: QueryUserDto): Promise<Musi[]> {
    return this.userService.findAll(query);
  }

  // Retrieve a user by ID
  @Get(':id')
  @ApiGetResource(Musi)
  async findOne(@Param('id') id: string): Promise<Musi> {
    return this.userService.findOne(id);
  }

  // Create a user
  @Post()
  @ApiPostRessource(UserResponseDto)
  async create(@Body() CreateMusiDto: CreateMusiDto): Promise<UserResponseDto> {
    const user = await this.userService.createUser(CreateMusiDto);
    await this.mailService.sendVerificationEmail(user.email);
    return user;
  }

  // Update a user
  @Patch(':id')
  @ApiPatchRessource(Musi)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Musi> {
    return this.userService.update(id, updateUserDto);
  }

  // Delete a user
  @Delete(':id')
  @ApiDeleteRessource(Musi)
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
