import { Controller, Get, Param } from '@nestjs/common';
import { SessionService } from './session.service';
import { ApiGetResource } from 'src/openapi/api.decorator';
import { Session } from './session.entity';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  // endpoint for get session by id user
  @Get('user/:id')
  @ApiGetResource(Session)
  async getSessionByIdUser(@Param('id') userId: string) {
    return await this.sessionService.findSessionByUserId(userId);
  }

  @Get()
  @ApiGetResource(Session, true)
  async getAllSessions(): Promise<Session[]> {
    return await this.sessionService.findAllSessions();
  }

  @Get('/:id')
  @ApiGetResource(Session)
  async getSessionById(@Param('id') id: string) {
    return await this.sessionService.findSessionById(id);
  }
}
