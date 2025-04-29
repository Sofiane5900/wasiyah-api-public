import { Module } from '@nestjs/common';
import { DeathController } from './death.controller';
import { DeathService } from './death.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musi } from '../musi/musi.entity';
import { DataSource } from 'typeorm';
import { DeathRepository } from './death.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Musi])],
  controllers: [DeathController],
  providers: [
    DeathService,
    {
      provide: DeathRepository,
      useFactory: (dataSource: DataSource) => {
        return new DeathRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  exports: [DeathRepository],
})
export class DeathModule {}
