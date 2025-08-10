import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { MusiService } from 'src/musi/musi.service';
import { Musi } from 'src/musi/musi.entity';
import { UpdateMusiDto } from 'src/musi/dto/update-musi.dto';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import * as argon2 from 'argon2';
import { plainToClass } from 'class-transformer';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { RoleUser } from 'src/enum/Roles';
import { StatusUser } from 'src/enum/User';
import { MusiRepository } from '../../src/musi/musi.repository';
import { RegisterMusiDto } from 'src/musi/dto/register-musi.dto';

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
  let musiRepository: Partial<MusiRepository>;
  let jwtService: Partial<JwtService>;
  let mailService: Partial<MailService>;
  let queryBuilder: any;

  const mockMusi: Partial<Musi> = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'hashed_password',
    isEmailVerified: false,
    roles: [RoleUser.ROLE_MUSI],
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
      findOneBy: vi.fn().mockResolvedValue(mockMusi),
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
          provide: MusiRepository,
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
      const registerMusiDto: RegisterMusiDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        birthDate: new Date('2000-01-01'),
      };

      const result = await musiService.createUser(registerMusiDto);

      expect(argon2.hash).toHaveBeenCalledWith('password123');
      expect(musiRepository.save).toHaveBeenCalledWith({
        ...registerMusiDto,
        password: 'hashed_password',
        roles: [RoleUser.ROLE_MUSI],
      });

      expect(plainToClass).toHaveBeenCalled();

      const plainToClassMock = vi.mocked(plainToClass);
      expect(plainToClassMock.mock.calls.length).toBe(1);

      expect(plainToClassMock.mock.calls[0][1]).toEqual(mockMusi);

      expect(result).toEqual(mockMusi);
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
