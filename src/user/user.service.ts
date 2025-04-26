import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import * as argon2 from 'argon2';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  // Create a user
  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await argon2.hash(createUserDto.password);
    const user = await this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });

    return plainToClass(UserResponseDto, user);
  }

  // Retrieve all users with search options
  async findAll(query: QueryUserDto): Promise<User[]> {
    const { firstName, lastName, email } = query;
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (firstName) {
      queryBuilder.andWhere('user.firstName LIKE :name', {
        firstName: `%${firstName}%`,
      });
    }
    if (lastName) {
      queryBuilder.andWhere('user.lastName LIKE :name', {
        lastName: `%${lastName}%`,
      });
    }

    if (email) {
      queryBuilder.andWhere('user.email LIKE :email', { email: `%${email}%` });
    }

    return queryBuilder.getMany();
  }

  // Retrieve a user by ID
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  // Retrieve a user by email
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'isEmailVerified', 'roles'],
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  // Update a user
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!updatedUser) {
      throw new NotFoundException();
    }

    return updatedUser;
  }

  // Delete a user
  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    await this.userRepository.delete(id);
  }
}
