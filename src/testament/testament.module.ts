import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testament } from './testament.entity';
import { MusiModule } from 'src/musi/musi.module';

Module({
  imports: [
    TypeOrmModule.forFeature([Testament]),
    forwardRef(() => MusiModule),
  ],
  exports: [TypeOrmModule],
});
export class TestamentModule {}
