import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionRepository } from './session.repository';
import { SessionController } from './session.controller';
import { Session } from './session.entity';
import { MusiRepository } from 'src/musi/musi.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [SessionService, SessionRepository, MusiRepository],
  controllers: [SessionController],
  exports: [SessionService, SessionRepository],
})
export class SessionModule {}
