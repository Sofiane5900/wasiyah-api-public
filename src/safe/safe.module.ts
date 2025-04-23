import { Module } from '@nestjs/common';
import { SafeController } from './safe.controller';
import { SafeService } from './safe.service';

@Module({
  controllers: [SafeController],
  providers: [SafeService],
})
export class SafeModule {}
