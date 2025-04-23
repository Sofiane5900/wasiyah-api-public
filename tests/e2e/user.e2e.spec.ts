import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8000';

const uniqueEmail = `user-e2e-${Date.now()}@example.com`;
const password = 'T3stP@ssword!';

interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
}

test('User E2E - should create a new user', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/api/v1/users`, {
    data: {
      firstName: 'E2E',
      lastName: 'User',
      email: uniqueEmail,
      password,
      roles: ['USER'],
    },
  });

  expect(response.status()).toBe(201);
  const body = (await response.json()) as UserResponse;
  expect(body).toMatchObject({
    email: uniqueEmail,
    firstName: 'E2E',
    lastName: 'User',
    isEmailVerified: false,
  });
  expect(body).toHaveProperty('id');
});
