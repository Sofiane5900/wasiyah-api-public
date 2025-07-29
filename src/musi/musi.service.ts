import { Injectable, NotFoundException } from '@nestjs/common';
import { Musi } from './musi.entity';
import { CreateMusiDto } from './dto/create-musi.dto';
import { UpdateMusiDto } from './dto/update-musi.dto';
import * as argon2 from 'argon2';
import { MusiResponseDto } from './dto/musi-response.dto';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { MusiRepository } from './musi.repository';

@Injectable()
export class MusiService {
  constructor(
    @InjectRepository(MusiRepository)
    private readonly musiRepository: MusiRepository,
  ) {}

  // Create a musi
  async createUser(createMusiDto: CreateMusiDto): Promise<MusiResponseDto> {
    const hashedPassword = await argon2.hash(createMusiDto.password);
    const musi = await this.musiRepository.save({
      ...createMusiDto,
      password: hashedPassword,
    });

    return plainToClass(MusiResponseDto, musi);
  }

  // Update musi
  async update(id: string, updateMusiDto: UpdateMusiDto): Promise<Musi> {
    await this.musiRepository.update(id, updateMusiDto);
    const updatedMusi = await this.musiRepository.findOne({
      where: { id },
    });

    if (!updatedMusi) {
      throw new NotFoundException();
    }

    return updatedMusi;
  }

  // Delete a musi
  async remove(id: string): Promise<void> {
    const musi = await this.musiRepository.findOne({
      where: { id },
    });

    if (!musi) {
      throw new NotFoundException();
    }

    await this.musiRepository.delete(id);
  }

  async findOneById(id: string): Promise<MusiResponseDto | null> {
    const musi = await this.musiRepository.findOne({
      where: { id },
    });

    if (!musi) {
      throw new NotFoundException();
    }

    return plainToClass(MusiResponseDto, musi);
  }

  async findAll(): Promise<MusiResponseDto[]> {
    const musis = await this.musiRepository.findAll();
    return musis.map((musi) => plainToClass(MusiResponseDto, musi));
  }
}
