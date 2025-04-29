import 'reflect-metadata';
import { test, expect } from 'vitest';
import axios from 'axios';
import { MusiResponseDto } from '../../src/musi/dto/musi-response.dto';
import { Musi } from '../../src/musi/musi.entity';
import process from 'node:process';
import dotenv from 'dotenv';
import {UnprocessableEntityException} from "@nestjs/common";

dotenv.config({ path: '.env.test' });

const BASE_URL = process.env.BASE_TEST_URL;

const musi = new Musi();
musi.firstName = 'E2E';
musi.lastName = 'Musi';
musi.email = `musi-e2e-${Date.now()}@example.com`;
musi.password = 'T3stP@ssword!';
musi.birthDate = new Date('1990-01-01');
musi.creationDate = new Date('2010-01-01');

test('Musi E2E - should create a new musi', async () => {
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

test('Musi E2E - test wrong password', async () => {
  musi.email = `musi-e2e-${Date.now()}-${Math.floor(Math.random() * 1000)}@example.com`;
  musi.password = 'abcdef';

  try {
    await axios.post(`${BASE_URL}/musis`, musi);
  } catch (error) {
    expect(error?.response?.status).toBe(422);
    const body = (await error?.response?.data) as UnprocessableEntityException;
    expect(body).toMatchObject({
      title: 'Validation Failed',
      type: 'UnprocessableEntityException',
      message: ['Your password must contain at least: 8 characters, 1 uppercase letter, 1 number, and 1 special character'],
      error: 'Unprocessable Entity',
    });
  }
}, 10000)

test('Musi E2E - test unique email', async () => {
  musi.password = 'T3stP@ssword!';

  try {
    await axios.post(`${BASE_URL}/musis`, musi);
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

test('Musi E2E - test wrong email', async () => {
  musi.email = 'email@.com';

  try {
    await axios.post(`${BASE_URL}/musis`, musi);
  } catch (error) {
    expect(error?.response?.status).toBe(422);
    const body = (await error?.response?.data) as UnprocessableEntityException;
    expect(body).toMatchObject({
      title: 'Validation Failed',
      type: 'UnprocessableEntityException',
      message: ['The email is not valid'],
      error: 'Unprocessable Entity',
    });
  }
}, 10000)
