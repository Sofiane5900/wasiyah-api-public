import { Module } from '@nestjs/common';
import { WakilService } from './wakil.service';
import { WakilController } from './wakil.controller';

@Module({
  providers: [WakilService],
  controllers: [WakilController],
})
export class WakilModule {}
