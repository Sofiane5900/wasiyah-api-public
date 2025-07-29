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
  async login(
    @Body() body: LoginDto,
    @Res() reply: FastifyReply,
    @Req() req: FastifyRequest,
  ) {
    return this.authService.login(body.email, body.password, reply, req);
  }

  @Post('refresh-token/invalidate')
  @ApiOperation({ summary: 'Logs out the user by invalidating refresh token' })
  @ApiResponse({ status: 200, description: 'Refresh token invalidated' })
  @ApiResponse({ status: 401, description: 'No refresh token provided' })
  async logout(@Req() req: FastifyRequest, @Res() reply: FastifyReply) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.logout(refreshToken, reply);
  }

  @Get('verify-email')
  @ApiOperation({ summary: 'Retrieves a verify email resource.' })
  @ApiResponse({ status: 200, description: 'Email verified with success.' })
  @ApiResponse({ status: 400, description: 'Link invalid or expired.' })
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }
}
