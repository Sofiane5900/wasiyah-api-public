import { test, expect } from 'vitest';
import axios from "axios";
import {UserResponseDto} from "../../src/user/dto/user-response.dto";

const BASE_URL = 'http://localhost:8000';

const uniqueEmail = `user-e2e-${Date.now()}@example.com`;
const password = 'T3stP@ssword!';

test('User E2E - should create a new user', async () => {
  const response = await axios.post(`${BASE_URL}/api/v1/users`, {
      firstName: 'E2E',
      lastName: 'User',
      email: uniqueEmail,
      password,
  });

  expect(response.status).toBe(201);
  const body = (await response.data) as UserResponseDto;
  expect(body).toMatchObject({
    email: uniqueEmail,
    firstName: 'E2E',
    lastName: 'User',
    isEmailVerified: false,
  });
  expect(body).toHaveProperty('id');
});
