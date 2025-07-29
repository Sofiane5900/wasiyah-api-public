import 'reflect-metadata';
import { test, expect, beforeAll, afterAll } from 'vitest';
import axios from 'axios';
import { MusiResponseDto } from '../../src/musi/dto/musi-response.dto';
import { Musi } from '../../src/musi/musi.entity';
import process from 'node:process';
import dotenv from 'dotenv';
import { UnprocessableEntityException } from '@nestjs/common';

dotenv.config({ path: '.env.test' });

const BASE_URL = process.env.BASE_TEST_URL;

// Configuration axios avec headers pour simuler une requête réelle
const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'X-Forwarded-For': '127.0.0.1',
    'User-Agent': 'Test-Agent/1.0',
  },
  timeout: 10000,
};

const musi = new Musi();
musi.firstName = 'E2E';
musi.lastName = 'Musi';
musi.email = `musi-e2e-${Date.now()}@example.com`;
musi.password = 'T3stP@ssword!';
musi.birthDate = new Date('1990-01-01');
musi.creationDate = new Date('2010-01-01');

test('Musi E2E - should create a new musi', async () => {
  try {
    const response = await axios.post(`${BASE_URL}/musis`, musi, axiosConfig);

    expect(response.status).toBe(201);
    const body = response.data as MusiResponseDto;
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

test('Musi E2E - test wrong password', async () => {
  const testMusi = { ...musi };
  testMusi.email = `musi-e2e-${Date.now()}-${Math.floor(Math.random() * 1000)}@example.com`;
  testMusi.password = 'abcdef';

  try {
    await axios.post(`${BASE_URL}/musis`, testMusi, axiosConfig);
    throw new Error('Expected validation error but request succeeded');
  } catch (error) {
    if (error.message === 'Expected validation error but request succeeded') {
      throw error;
    }

    expect(error?.response?.status).toBe(422);
    const body = error?.response?.data as UnprocessableEntityException;
    expect(body).toMatchObject({
      title: 'Validation Failed',
      type: 'UnprocessableEntityException',
      message: [
        'Your password must contain at least: 8 characters, 1 uppercase letter, 1 number, and 1 special character',
      ],
      error: 'Unprocessable Entity',
    });
  }
}, 10000);

test('Musi E2E - test unique email', async () => {
  const testMusi = { ...musi };
  testMusi.password = 'T3stP@ssword!';

  try {
    await axios.post(`${BASE_URL}/musis`, testMusi, axiosConfig);
    throw new Error(
      'Expected unique email constraint error but request succeeded',
    );
  } catch (error) {
    if (
      error.message ===
      'Expected unique email constraint error but request succeeded'
    ) {
      throw error;
    }

    expect(error?.response?.status).toBe(422);
    const body = error?.response?.data as UnprocessableEntityException;
    expect(body).toMatchObject({
      title: 'Validation Failed',
      type: 'UnprocessableEntityException',
      message: ['This email is already associated with an account'],
      error: 'Unprocessable Entity',
    });
  }
}, 10000);

test('Musi E2E - test wrong email format', async () => {
  const testMusi = { ...musi };
  testMusi.email = 'email@.com';
  testMusi.password = 'T3stP@ssword!';

  try {
    await axios.post(`${BASE_URL}/musis`, testMusi, axiosConfig);
    throw new Error('Expected email validation error but request succeeded');
  } catch (error) {
    if (
      error.message === 'Expected email validation error but request succeeded'
    ) {
      throw error;
    }

    expect(error?.response?.status).toBe(422);
    const body = error?.response?.data as UnprocessableEntityException;
    expect(body).toMatchObject({
      title: 'Validation Failed',
      type: 'UnprocessableEntityException',
      message: ['The email is not valid'],
      error: 'Unprocessable Entity',
    });
  }
}, 10000);

// test('Musi E2E - login should create session tracking', async () => {
//   const loginTestMusi = new Musi();
//   loginTestMusi.firstName = 'Login';
//   loginTestMusi.lastName = 'Test';
//   loginTestMusi.email = `login-test-${Date.now()}@example.com`;
//   loginTestMusi.password = 'T3stP@ssword!';
//   loginTestMusi.birthDate = new Date('1990-01-01');
//   loginTestMusi.creationDate = new Date('2010-01-01');

//   try {
//     const createResponse = await axios.post(
//       `${BASE_URL}/musis`,
//       loginTestMusi,
//       axiosConfig,
//     );
//     expect(createResponse.status).toBe(201);

//     const loginResponse = await axios.post(
//       `${BASE_URL}/auth/login`,
//       {
//         email: loginTestMusi.email,
//         password: loginTestMusi.password,
//       },
//       {
//         ...axiosConfig,
//         headers: {
//           ...axiosConfig.headers,
//           'X-Real-IP': '192.168.1.100',
//         },
//       },
//     );
//   } catch (error) {
//     if (error?.response?.status === 401) {
//       return;
//     }

//     throw error;
//   }
// }, 10000);
