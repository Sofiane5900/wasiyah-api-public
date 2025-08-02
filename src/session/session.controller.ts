import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { SessionService } from './session.service';
import { ApiGetResource } from 'src/openapi/api.decorator';
import { Session } from './session.entity';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get(':id')
  @ApiGetResource(Session)
  async getSessionByIdUser(@Param('id') userId: string) {
    console.log('userId in controller console log =>', userId);
    if (!userId) {
      throw new NotFoundException('User ID is required');
    }
    return await this.sessionService.findSessionByUserId(userId);
  }
}
