// tests/e2e/user.e2e.spec.ts
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8000';

test.describe('User E2E - Register', () => {
  const uniqueEmail = `user-e2e-${Date.now()}@example.com`;
  const password = 'T3stP@ssword!';

  const user = {
    firstName: 'E2E',
    lastName: 'User',
    email: uniqueEmail,
    password,
    roles: ['USER'],
  };

  test('should create a new user and return UserResponseDto', async ({
    request,
  }) => {
    const response = await request.post(`${BASE_URL}/api/v1/users`, {
      data: user,
    });

    expect(response.status()).toBe(201);
    const body = await response.json();

    expect(body).toMatchObject({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isEmailVerified: false,
    });

    expect(body).toHaveProperty('id');
  });
});
