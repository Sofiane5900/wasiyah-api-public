import { Module } from '@nestjs/common';
import { AppointController } from './appoint.controller';
import { AppointService } from './appoint.service';

@Module({
  controllers: [AppointController],
  providers: [AppointService],
})
export class AppointModule {}
