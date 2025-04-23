import { Module } from '@nestjs/common';
import { TestamentController } from './testament.controller';
import { TestamentService } from './testament.service';

@Module({
  controllers: [TestamentController],
  providers: [TestamentService],
})
export class TestamentModule {}
