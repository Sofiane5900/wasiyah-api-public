import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musi } from './musi.entity';
import { CreateMusiDto } from './dto/create-musi.dto';
import { UpdateMusiDto } from './dto/update-musi.dto';
import { QueryMusiDto } from './dto/query-musi.dto';
import * as argon2 from 'argon2';
import { MusiResponseDto } from './dto/musi-response.dto';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class MusiService {
  constructor(
    @InjectRepository(Musi)
    private userRepository: Repository<Musi>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  // Create a musi
  async createUser(createUserDto: CreateMusiDto): Promise<MusiResponseDto> {
    const hashedPassword = await argon2.hash(createUserDto.password);
    const musi = await this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });

    return plainToClass(MusiResponseDto, musi);
  }

  // Retrieve all musis with search options
  async findAll(query: QueryMusiDto): Promise<Musi[]> {
    const { firstName, lastName, email } = query;
    const queryBuilder = this.userRepository.createQueryBuilder('musi');

    if (firstName) {
      queryBuilder.andWhere('musi.firstName LIKE :name', {
        firstName: `%${firstName}%`,
      });
    }
    if (lastName) {
      queryBuilder.andWhere('musi.lastName LIKE :name', {
        lastName: `%${lastName}%`,
      });
    }

    if (email) {
      queryBuilder.andWhere('musi.email LIKE :email', { email: `%${email}%` });
    }

    return queryBuilder.getMany();
  }

  // Retrieve a musi by ID
  async findOne(id: string): Promise<Musi> {
    const musi = await this.userRepository.findOne({
      where: { id },
    });

    if (!musi) {
      throw new NotFoundException();
    }

    return musi;
  }

  // Retrieve a musi by email
  async findByEmail(email: string): Promise<Musi | undefined> {
    const musi = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'isEmailVerified', 'roles'],
    });

    if (!musi) {
      throw new NotFoundException();
    }

    return musi;
  }

  // Update a musi
  async update(id: string, updateUserDto: UpdateMusiDto): Promise<Musi> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!updatedUser) {
      throw new NotFoundException();
    }

    return updatedUser;
  }

  // Delete a musi
  async remove(id: string): Promise<void> {
    const musi = await this.userRepository.findOne({
      where: { id },
    });

    if (!musi) {
      throw new NotFoundException();
    }

    await this.userRepository.delete(id);
  }
}
