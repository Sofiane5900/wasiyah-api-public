// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Création d'un utilisateur
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
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
      where: { id }, // Utilisation de FindOneOptions pour rechercher avec un ID
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  // Mettre à jour un utilisateur
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({
      where: { id }, // Utilisation de FindOneOptions pour rechercher avec un ID
    });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  // Supprimer un utilisateur
  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id }, // Utilisation de FindOneOptions pour rechercher avec un ID
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.delete(id);
  }
}
