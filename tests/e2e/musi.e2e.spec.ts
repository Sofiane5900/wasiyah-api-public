import 'reflect-metadata';
import { test, expect } from 'vitest';
import axios from 'axios';
import { MusiResponseDto } from '../../src/musi/dto/musi-response.dto';
import { Musi } from '../../src/musi/musi.entity';
import process from 'node:process';
import dotenv from 'dotenv';
import { StatusUser } from '../../src/enum/User';

dotenv.config({ path: '.env.test' });

const BASE_URL = process.env.BASE_TEST_URL;

const musi = new Musi();
musi.firstName = 'E2E';
musi.lastName = 'User';
musi.email = `musi-e2e-${Date.now()}@example.com`;
musi.password = 'T3stP@ssword!';
musi.birthDate = new Date('1990-01-01');
musi.creationDate = new Date('2010-01-01');

test('User E2E - should create a new musi', async () => {
  try {
    const response = await axios.post(`${BASE_URL}/musis`, musi);

    expect(response.status).toBe(201);
    const body = (await response.data) as MusiResponseDto;
    expect(body).toMatchObject({
      email: musi.email,
      firstName: musi.firstName,
      lastName: musi.lastName,
      isEmailVerified: false,
    });
    expect(body).toHaveProperty('id');
  } catch (error) {
    throw error;
  }
}, 10000);
