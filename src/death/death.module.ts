import { Module } from '@nestjs/common';
import { DeathController } from './death.controller';
import { DeathService } from './death.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musi } from '../musi/musi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Musi])],
  controllers: [DeathController],
  providers: [DeathService],
})
export class DeathModule {}
