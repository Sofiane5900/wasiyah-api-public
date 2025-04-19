// src/user/user.service.ts
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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Création d'un utilisateur
  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await argon2.hash(createUserDto.password);
    const user = await this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });

    // OTP JWT Pour vérification du mail de l'user
    const emailToken = this.jwtService.sign(
      { email: user.email },
      { expiresIn: '24h' },
    );

    //TODO: avoir une réponse avec le lien du front
    const verifyLink = `http://localhost:8000/auth/verify-email?token=${emailToken}`;
    return plainToClass(UserResponseDto, user);
  }

  // Récupérer tous les utilisateurs avec des options de recherche
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

  // Récupérer un utilisateur par ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'roles'],
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  // Mettre à jour un utilisateur
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!updatedUser) {
      throw new NotFoundException();
    }

    return updatedUser;
  }

  // Supprimer un utilisateur
  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    await this.userRepository.delete(id);
  }
}
