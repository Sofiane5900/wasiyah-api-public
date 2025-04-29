import { Module } from '@nestjs/common';
import { SafeController } from './safe.controller';
import { SafeService } from './safe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Safe } from './safe.entity';
import { SafeRepository } from './safe.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Safe])],
  controllers: [SafeController],
  providers: [
    SafeService,
    {
      provide: SafeRepository,
      useFactory: (dataSource: DataSource) => {
        return new SafeRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  exports: [SafeRepository],
})
export class SafeModule {}
