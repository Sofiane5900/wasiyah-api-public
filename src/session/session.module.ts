import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionRepository } from './session.repository';
import { SessionController } from './session.controller';
import { Session } from './session.entity';

@Module({
  providers: [SessionService, SessionRepository],
  controllers: [SessionController],
  imports: [Session],
  exports: [SessionService, SessionRepository, Session],
})
export class SessionModule {}
