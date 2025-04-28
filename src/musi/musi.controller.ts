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
import { MusiService } from './musi.service';
import { CreateMusiDto } from './dto/create-musi.dto';
import { UpdateMusiDto } from './dto/update-musi.dto';
import { QueryMusiDto } from './dto/query-musi.dto';
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
import { MusiResponseDto } from './dto/musi-response.dto';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guards';
import { MailService } from 'src/mail/mail.service';

@ApiTags('musis')
@Controller('musis')
export class MusiController {
  constructor(
    private readonly userService: MusiService,
    private readonly mailService: MailService,
  ) {}

  // Retrieve all musis with search
  @Get()
  @Roles('ROLE_ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiGetResource(Musi, true)
  async findAll(@Query() query: QueryMusiDto): Promise<Musi[]> {
    return this.userService.findAll(query);
  }

  // Retrieve a musi by ID
  @Get(':id')
  @ApiGetResource(Musi)
  async findOne(@Param('id') id: string): Promise<Musi> {
    return this.userService.findOne(id);
  }

  // Create a musi
  @Post()
  @ApiPostRessource(MusiResponseDto)
  async create(@Body() CreateMusiDto: CreateMusiDto): Promise<MusiResponseDto> {
    const musi = await this.userService.createUser(CreateMusiDto);
    await this.mailService.sendVerificationEmail(musi.email);
    return musi;
  }

  // Update a musi
  @Patch(':id')
  @ApiPatchRessource(Musi)
  async update(
    @Param('id') id: string,
    @Body() updateMusiDto: UpdateMusiDto,
  ): Promise<Musi> {
    return this.userService.update(id, updateMusiDto);
  }

  // Delete a user
  @Delete(':id')
  @ApiDeleteRessource(Musi)
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
