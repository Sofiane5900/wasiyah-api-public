import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import * as argon2 from 'argon2';
import { plainToClass } from 'class-transformer';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {UserRepository} from "../../src/user/user.repository";

vi.mock('argon2', () => ({
  hash: vi.fn().mockResolvedValue('hashed_password'),
}));

vi.mock('class-transformer', async () => {
  const actual = await vi.importActual<typeof import('class-transformer')>('class-transformer');

  return {
    ...actual,
    plainToClass: vi.fn().mockImplementation(<T>(_cls: unknown, obj: T): T => obj),
  };
});

describe('UserService', () => {
  let userService: UserService;
  let userRepository:  Partial<UserRepository>;
  let jwtService: Partial<JwtService>;
  let mailService: Partial<MailService>;
  let queryBuilder: any;

  const mockUser: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'hashed_password',
    isEmailVerified: false,
    roles: ['USER'],
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    queryBuilder = {
      andWhere: vi.fn().mockReturnThis(),
      getMany: vi.fn().mockResolvedValue([mockUser]),
    };

    userRepository = {
      save: vi.fn().mockResolvedValue(mockUser),
      findOne: vi.fn().mockResolvedValue(mockUser),
      findOneBy: vi.fn().mockResolvedValue(mockUser),
      update: vi.fn().mockResolvedValue({ affected: 1 }),
      delete: vi.fn().mockResolvedValue({ affected: 1 }),
      createQueryBuilder: vi.fn().mockReturnValue(queryBuilder),
    };

    jwtService = {
      sign: vi.fn().mockReturnValue('mock_token'),
    };

    mailService = {
      sendVerificationEmail: vi.fn().mockResolvedValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: userRepository,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
        {
          provide: MailService,
          useValue: mailService,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user with hashed password', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        roles: ['USER'],
      };

      const result = await userService.create(createUserDto);

      expect(argon2.hash).toHaveBeenCalledWith('password123');
      expect(userRepository.save).toHaveBeenCalledWith({
        ...createUserDto,
        password: 'hashed_password',
      });

      expect(plainToClass).toHaveBeenCalled();

      const plainToClassMock = vi.mocked(plainToClass);
      expect(plainToClassMock.mock.calls.length).toBe(1);

      expect(plainToClassMock.mock.calls[0][1]).toEqual(mockUser);

      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update and return a user', async () => {
      const updateUserDto: UpdateUserDto = {
        firstName: 'Jane',
      };

      const result = await userService.update(1, updateUserDto);

      expect(userRepository.update).toHaveBeenCalledWith(1, updateUserDto);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException when updating non-existent user', async () => {
      userRepository.update = vi.fn().mockResolvedValue({ affected: 1 });
      userRepository.findOne = vi.fn().mockResolvedValue(null);

      const updateUserDto: UpdateUserDto = {
        firstName: 'Jane',
      };

      await expect(userService.update(999, updateUserDto)).rejects.toThrow(
        NotFoundException,
      );

      expect(userRepository.update).toHaveBeenCalledWith(999, updateUserDto);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe('remove', () => {
    it('should remove a user successfully', async () => {
      await userService.remove(1);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(userRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when removing non-existent user', async () => {
      userRepository.findOne = vi.fn().mockResolvedValue(null);

      await expect(userService.remove(999)).rejects.toThrow(NotFoundException);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
      });
      expect(userRepository.delete).not.toHaveBeenCalled();
    });
  });
});
