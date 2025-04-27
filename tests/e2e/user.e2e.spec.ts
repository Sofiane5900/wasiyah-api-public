import 'reflect-metadata';
import { test, expect } from 'vitest';
import axios from 'axios';
import { UserResponseDto } from '../../src/user/dto/user-response.dto';
import { User } from '../../src/user/user.entity';
import process from 'node:process';
import dotenv from 'dotenv';
import {StatusUser} from "../../src/enum/User";

dotenv.config({ path: '.env.test' });

const BASE_URL = process.env.BASE_TEST_URL;

const user = new User();
user.firstName = 'E2E';
user.lastName = 'User';
user.email = `user-e2e-${Date.now()}@example.com`;
user.password = 'T3stP@ssword!';
user.birthDate = new Date('1990-01-01');
user.creationDate = new Date('2010-01-01');

test('User E2E - should create a new user', async () => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, user);

    expect(response.status).toBe(201);
    const body = (await response.data) as UserResponseDto;
    expect(body).toMatchObject({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isEmailVerified: false,
    });
    expect(body).toHaveProperty('id');
  } catch (error) {
    throw error;
  }

}, 10000);
