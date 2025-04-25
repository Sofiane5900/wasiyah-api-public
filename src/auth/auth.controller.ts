import { Controller, Post, Body, Res, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({
    summary: `Retrieves a login resource.`,
    description: `Retrieves a login resource.`,
  })
  @ApiResponse({
    status: 201,
    description: `User login ressource`,
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  })
  async login(@Body() body: LoginDto, @Res() reply: FastifyReply) {
    return this.authService.login(body.email, body.password, reply);
  }

  @Get('verify-email')
  @ApiOperation({ summary: 'Retrieves a verify email resource.' })
  @ApiResponse({ status: 200, description: 'Email verified with success.' })
  @ApiResponse({ status: 400, description: 'Link invalid or expired.' })
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }
}
