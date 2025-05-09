import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FastifyReply, FastifyRequest } from 'fastify';
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
    description: `Musi login ressource`,
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

  @Get('refresh-token')
  @ApiOperation({
    summary: 'Refreshes access token using refresh token cookie',
  })
  @ApiResponse({ status: 200, description: 'Access token refreshed' })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  async refreshToken(@Req() req: FastifyRequest, @Res() reply: FastifyReply) {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token found');
    }

    return this.authService.refreshAcessToken(refreshToken, reply);
  }
}
