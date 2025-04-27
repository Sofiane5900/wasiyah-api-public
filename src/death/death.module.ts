import { Module } from '@nestjs/common';
import { DeathController } from './death.controller';
import { DeathService } from './death.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [DeathController],
  providers: [DeathService],
})
export class DeathModule {}
