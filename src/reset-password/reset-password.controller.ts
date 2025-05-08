import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResetPasswordService } from './reset-password.service';
import { FastifyReply } from 'fastify';
import { isEmail } from 'class-validator';

@ApiTags('ResetPassword')
@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('request')
  @ApiOperation({
    summary: 'Retrieves a ResetPassword request resource',
    description: 'Retrieves a ResetPassword request resource',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'The email received',
          example: 'string',
        },
      },
      required: ['email'],
    },
    required: true,
  })
  @ApiResponse({
    example: { message: 'Reset password request received' },
    status: 201,
  })
  async getRequest(
    @Body('email') email: string,
    @Res() reply: FastifyReply,
  ): Promise<FastifyReply> {
    if (!isEmail(email)) {
      throw new UnprocessableEntityException('Email is not valid');
    }

    await this.resetPasswordService.createResetToken(email);

    return reply.status(201).send({
      message: 'Reset password request received',
    });
  }

  @Get('validate')
  @ApiOperation({ summary: 'Retrieves a ResetPassword validate resource' })
  @ApiResponse({
    example: { message: 'Token is validate' },
    status: 200,
  })
  async getToken(
    @Query('token') token: string,
    @Res() reply: FastifyReply,
  ): Promise<FastifyReply> {
    await this.resetPasswordService.validateResetToken(token);

    return reply.status(200).send({
      message: 'Reset password token validated',
    });
  }

  @Post('reset')
  @ApiOperation({
    summary: 'Retrieves a ResetPassword reset resource',
    description: 'Retrieves a ResetPassword reset resource',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          description: 'The reset token received by email.',
          example: 'string',
        },
        plainPassword: {
          type: 'string',
          description: 'The new password to set for the user.',
          example: 'string',
        },
      },
      required: ['token', 'plainPassword'],
    },
    required: true,
  })
  @ApiResponse({
    example: { message: 'Password updated with success' },
    status: 201,
  })
  async resetPassword(
    @Body() body: { token: string; plainPassword: string },
    @Res() reply: FastifyReply,
  ): Promise<FastifyReply> {
    await this.resetPasswordService.updatePassword(
      body.token,
      body.plainPassword,
    );

    return reply.status(200).send({
      message: 'Password updated with success',
    });
  }
}
