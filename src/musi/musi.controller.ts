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
import { MusiService } from './musi.service';
import { UpdateMusiDto } from './dto/update-musi.dto';
import { Musi } from './musi.entity';
import { ApiParam, ApiTags } from '@nestjs/swagger';
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
import { MusiRepository } from './musi.repository';
import { RegisterMusiDto } from './dto/register-musi.dto';

@ApiTags('musis')
@Controller('musis')
export class MusiController {
  constructor(
    private readonly musiRepository: MusiRepository,
    private readonly musiService: MusiService,
    private readonly mailService: MailService,
  ) {}

  // Retrieve all musis with search
  @Get()
  @Roles('ROLE_ADMIN', 'ROLE_MUSI')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiGetResource(Musi, true)
  async findAll(): Promise<MusiResponseDto[]> {
    return await this.musiService.findAll();
  }

  // Retrieve a musi by ID
  @Get(':id')
  @ApiGetResource(MusiResponseDto)
  async findOne(@Param('id') id: string): Promise<MusiResponseDto | null> {
    return await this.musiService.findOneById(id);
  }

  // Create a musi
  @Post()
  @ApiPostRessource(MusiResponseDto)
  async create(
    @Body() registerMusiDto: RegisterMusiDto,
  ): Promise<MusiResponseDto> {
    const musi = await this.musiService.createUser(registerMusiDto);
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
    return this.musiService.update(id, updateMusiDto);
  }

  // Delete a musi
  @Delete(':id')
  @ApiDeleteRessource(Musi)
  @ApiParam({
    name: 'id',
    type: String,
    description: 'delete a musi by id',
    example: 'd5b3a4c9-72f8-4abf-b98e-d7e5c9bfc330',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.musiService.remove(id);
  }
}
