import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MusiService } from 'src/musi/musi.service';
import { Musi } from 'src/musi/musi.entity';
import { CreateMusiDto } from 'src/musi/dto/create-musi.dto';
import { UpdateMusiDto } from 'src/musi/dto/update-musi.dto';
import { QueryMusiDto } from 'src/musi/dto/query-musi.dto';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import * as argon2 from 'argon2';
import { plainToClass } from 'class-transformer';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { RoleUser } from 'src/enum/Roles';
import { StatusUser } from 'src/enum/User';

// Mockers pour argon2
vi.mock('argon2', () => ({
  hash: vi.fn().mockResolvedValue('hashed_password'),
}));

vi.mock('class-transformer', async () => {
  const actual =
    await vi.importActual<typeof import('class-transformer')>(
      'class-transformer',
    );

  return {
    ...actual,
    plainToClass: vi
      .fn()
      .mockImplementation(<T>(_cls: unknown, obj: T): T => obj),
  };
});

describe('MusiService', () => {
  let musiService: MusiService;
  let musiRepository: Partial<Repository<Musi>>;
  let jwtService: Partial<JwtService>;
  let mailService: Partial<MailService>;
  let queryBuilder: any;

  const mockMusi: Partial<Musi> = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'hashed_password',
    isEmailVerified: false,
    roles: RoleUser.ROLE_USER,
    birthDate: new Date('1990-01-01'),
    creationDate: new Date('2010-01-01'),
    twoFactorEnabled: false,
    status: StatusUser.ACTIVE,
    organDonor: false,
  };

  beforeEach(async () => {
    // Réinitialisation des mocks
    vi.clearAllMocks();

    // Création d'un mock pour le queryBuilder
    queryBuilder = {
      andWhere: vi.fn().mockReturnThis(),
      getMany: vi.fn().mockResolvedValue([mockMusi]),
    };

    // Création des mocks
    musiRepository = {
      save: vi.fn().mockResolvedValue(mockMusi),
      findOne: vi.fn().mockResolvedValue(mockMusi),
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
        MusiService,
        {
          provide: getRepositoryToken(Musi),
          useValue: musiRepository,
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

    musiService = module.get<MusiService>(MusiService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('createMusi', () => {
    it('should create a new musi with hashed password', async () => {
      const CreateMusiDto: CreateMusiDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        roles: RoleUser.ROLE_USER,
      };

      const result = await musiService.createUser(CreateMusiDto);

      expect(argon2.hash).toHaveBeenCalledWith('password123');
      expect(musiRepository.save).toHaveBeenCalledWith({
        ...CreateMusiDto,
        password: 'hashed_password',
      });

      expect(plainToClass).toHaveBeenCalled();

      const plainToClassMock = vi.mocked(plainToClass);
      expect(plainToClassMock.mock.calls.length).toBe(1);

      expect(plainToClassMock.mock.calls[0][1]).toEqual(mockMusi);

      expect(result).toEqual(mockMusi);
    });
  });

  describe('findAll', () => {
    it('should return all users without filters', async () => {
      const query: QueryMusiDto = {};

      const result = await musiService.findAll(query);

      expect(musiRepository.createQueryBuilder).toHaveBeenCalledWith('musi');
      expect(queryBuilder.andWhere).not.toHaveBeenCalled();
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual([mockMusi]);
    });

    it('should filter users by firstName', async () => {
      const query: QueryMusiDto = { firstName: 'John' };

      const result = await musiService.findAll(query);

      expect(musiRepository.createQueryBuilder).toHaveBeenCalledWith('musi');
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'musi.firstName LIKE :name',
        {
          firstName: '%John%',
        },
      );
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual([mockMusi]);
    });

    it('should filter users by lastName', async () => {
      const query: QueryMusiDto = { lastName: 'Doe' };

      const result = await musiService.findAll(query);

      expect(musiRepository.createQueryBuilder).toHaveBeenCalledWith('musi');
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'musi.lastName LIKE :name',
        {
          lastName: '%Doe%',
        },
      );
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual([mockMusi]);
    });

    it('should filter users by email', async () => {
      const query: QueryMusiDto = { email: 'john.doe' };

      const result = await musiService.findAll(query);

      expect(musiRepository.createQueryBuilder).toHaveBeenCalledWith('musi');
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        'musi.email LIKE :email',
        {
          email: '%john.doe%',
        },
      );
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual([mockMusi]);
    });

    it('should apply multiple filters', async () => {
      const query: QueryMusiDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe',
      };

      const result = await musiService.findAll(query);

      expect(musiRepository.createQueryBuilder).toHaveBeenCalledWith('musi');
      expect(queryBuilder.andWhere).toHaveBeenCalledTimes(3);
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual([mockMusi]);
    });
  });

  describe('findOne', () => {
    it('should return a musi by id', async () => {
      const result = await musiService.findOne('1');

      expect(musiRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(mockMusi);
    });

    it('should throw NotFoundException when musi is not found', async () => {
      musiRepository.findOne = vi.fn().mockResolvedValue(null);

      await expect(musiService.findOne('999')).rejects.toThrow(
        NotFoundException,
      );

      expect(musiRepository.findOne).toHaveBeenCalledWith({
        where: { id: '999' },
      });
    });
  });

  describe('findByEmail', () => {
    it('should return a musi by email with specific selected fields', async () => {
      const result = await musiService.findByEmail('john.doe@example.com');

      expect(musiRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'john.doe@example.com' },
        select: ['id', 'email', 'password', 'isEmailVerified', 'roles'],
      });
      expect(result).toEqual(mockMusi);
    });

    it('should throw NotFoundException when musi is not found by email', async () => {
      musiRepository.findOne = vi.fn().mockResolvedValue(null);

      await expect(
        musiService.findByEmail('nonexistent@example.com'),
      ).rejects.toThrow(NotFoundException);

      expect(musiRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'nonexistent@example.com' },
        select: ['id', 'email', 'password', 'isEmailVerified', 'roles'],
      });
    });
  });

  describe('update', () => {
    it('should update and return a musi', async () => {
      const updateMusiDto: UpdateMusiDto = {
        firstName: 'Jane',
      };

      const result = await musiService.update('1', updateMusiDto);

      expect(musiRepository.update).toHaveBeenCalledWith('1', updateMusiDto);
      expect(musiRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(mockMusi);
    });

    it('should throw NotFoundException when updating non-existent musi', async () => {
      musiRepository.update = vi.fn().mockResolvedValue({ affected: 1 });
      musiRepository.findOne = vi.fn().mockResolvedValue(null);

      const updateMusiDto: UpdateMusiDto = {
        firstName: 'Jane',
      };

      await expect(musiService.update('999', updateMusiDto)).rejects.toThrow(
        NotFoundException,
      );

      expect(musiRepository.update).toHaveBeenCalledWith('999', updateMusiDto);
      expect(musiRepository.findOne).toHaveBeenCalledWith({
        where: { id: '999' },
      });
    });
  });

  describe('remove', () => {
    it('should remove musi successfully', async () => {
      await musiService.remove('1');

      expect(musiRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(musiRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when removing non-existent musi', async () => {
      musiRepository.findOne = vi.fn().mockResolvedValue(null);

      await expect(musiService.remove('999')).rejects.toThrow(
        NotFoundException,
      );

      expect(musiRepository.findOne).toHaveBeenCalledWith({
        where: { id: '999' },
      });
      expect(musiRepository.delete).not.toHaveBeenCalled();
    });
  });
});
