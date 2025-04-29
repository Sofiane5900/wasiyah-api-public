import { Module } from '@nestjs/common';
import { SafeController } from './safe.controller';
import { SafeService } from './safe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Safe } from './safe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Safe])],
  controllers: [SafeController],
  providers: [SafeService],
})
export class SafeModule {}
