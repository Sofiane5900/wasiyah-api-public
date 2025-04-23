import { Module } from '@nestjs/common';
import { DeathController } from './death.controller';
import { DeathService } from './death.service';

@Module({
  controllers: [DeathController],
  providers: [DeathService],
})
export class DeathModule {}
