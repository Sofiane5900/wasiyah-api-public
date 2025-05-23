import 'reflect-metadata';
import { test, expect } from 'vitest';
import axios from 'axios';
import { MusiResponseDto } from '../../src/musi/dto/musi-response.dto';
import { Musi } from '../../src/musi/musi.entity';
import process from 'node:process';
import dotenv from 'dotenv';
import {UnprocessableEntityException} from "@nestjs/common";
import {FastifyReply} from "fastify";

dotenv.config({ path: '.env.test' });

const BASE_URL = process.env.BASE_TEST_URL;

const musi = new Musi();
musi.firstName = 'E2E';
musi.lastName = 'Musi';
musi.email = `musi-e2e@example.com`;
musi.password = 'T3stP@ssword!';
musi.birthDate = new Date('1990-01-01');
musi.creationDate = new Date('2010-01-01');

test('Request Reset password', async () => {
  // try {
  //   await axios.post(`${BASE_URL}/musis`, musi);
  //   const response = await axios.post(`${BASE_URL}/reset-password/request`, musi);
  //
  //   expect(response.status).toBe(201);
  //   const body = (await response.data) as FastifyReply;
  //   expect(body).toMatchObject({
  //     message: 'Reset password request received',
  //   });
  // } catch (error) {
  //   throw error;
  // }
}, 10000);