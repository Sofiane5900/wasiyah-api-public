import {test, expect, beforeAll} from 'vitest';
import axios from 'axios';
import { UserResponseDto } from '../../src/user/dto/user-response.dto';
import { User } from '../../src/user/user.entity';
import process from 'node:process';
import dotenv from 'dotenv';
import {UnprocessableEntityException} from "@nestjs/common";

dotenv.config({ path: '.env.test' });

const BASE_URL = process.env.BASE_TEST_URL;

const user = new User();
user.firstName = 'E2E';
user.lastName = 'User';
user.email = `user-e2e-${Date.now()}-${Math.floor(Math.random() * 1000)}@example.com`;
user.password = 'T3stP@ssword!';

test('User E2E - should create a new user', async () => {
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
}, 10000);

test('User E2E - test wrong password', async () => {
  user.email = `user-e2e-${Date.now()}-${Math.floor(Math.random() * 1000)}@example.com`;
  user.password = 'abcdef';

  try {
    await axios.post(`${BASE_URL}/users`, user);
  } catch (error) {
    expect(error?.response?.status).toBe(422);
    const body = (await error?.response?.data) as UnprocessableEntityException;
    expect(body).toMatchObject({
      title: 'Validation Failed',
      type: 'UnprocessableEntityException',
      message: ['Votre mot de passe doit contenir au minimum : 8 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial'],
      error: 'Unprocessable Entity',
    });
  }
}, 10000)

test('User E2E - test unique email', async () => {
  user.password = 'T3stP@ssword!';

  try {
    await axios.post(`${BASE_URL}/users`, user);
  } catch (error) {
    expect(error?.response?.status).toBe(422);
    const body = (await error?.response?.data) as UnprocessableEntityException;
    expect(body).toMatchObject({
      title: 'Validation Failed',
      type: 'UnprocessableEntityException',
      message: ['Cet email à déjà un compte'],
      error: 'Unprocessable Entity',
    });
  }
}, 10000)

test('User E2E - test wrong email', async () => {
  user.email = 'email@.com';

  try {
    await axios.post(`${BASE_URL}/users`, user);
  } catch (error) {
    expect(error?.response?.status).toBe(422);
    const body = (await error?.response?.data) as UnprocessableEntityException;
    expect(body).toMatchObject({
      title: 'Validation Failed',
      type: 'UnprocessableEntityException',
      message: ['L\'email n\'est pas valide'],
      error: 'Unprocessable Entity',
    });
  }
}, 10000)
