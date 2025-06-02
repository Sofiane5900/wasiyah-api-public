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
import { CreateMusiDto } from './dto/create-musi.dto';
import { UpdateMusiDto } from './dto/update-musi.dto';
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
import { MusiRepository } from './musi.repository';

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
  async findAll(): Promise<Musi[]> {
    return this.musiRepository.findAll();
  }

  // Retrieve a musi by ID
  @Get(':id')
  @ApiGetResource(Musi)
  async findOne(@Param('id') id: string): Promise<MusiResponseDto | null> {
    return await this.musiRepository.findOneBy({ id });
  }

  // Create a musi
  @Post()
  @ApiPostRessource(MusiResponseDto)
  async create(@Body() CreateMusiDto: CreateMusiDto): Promise<MusiResponseDto> {
    const musi = await this.musiService.createUser(CreateMusiDto);
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

  // Delete a user
  @Delete(':id')
  @ApiDeleteRessource(Musi)
  async remove(@Param('id') id: string): Promise<void> {
    return this.musiService.remove(id);
  }
}
