import { Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Inject } from '@nestjs/common';
import { UrlGeneratorInterface } from './url-generator.interface';
import * as process from 'node:process';

@Injectable()
export class UrlGeneratorService implements UrlGeneratorInterface {
  constructor(@Inject('REQUEST') private readonly request: FastifyRequest) {}

  generate(path: string, params?: Record<string, string | number>): string {
    let finalPath = path;
    if (params) {
      for (const key in params) {
        finalPath = finalPath.replace(`:${key}`, String(params[key]));
      }
    }
    return finalPath;
  }

  generateAbsolute(
    path: string,
    params?: Record<string, string | number>,
  ): string {
    const baseUrl = `${this.request.protocol}://${this.request.hostname}${process.env.NODE_ENV !== 'prod' ? ':8000' : ''}`;
    const relativePath = this.generate(path, params);
    console.log(this.request.hostname);
    return `${baseUrl}/api/v1/${relativePath}`;
  }
}
