import { forwardRef, Module } from '@nestjs/common';
import { WakilService } from './wakil.service';
import { WakilController } from './wakil.controller';
import { DeclareModule } from 'src/declare/declare.module';

@Module({
  imports: [forwardRef(() => DeclareModule)],
  providers: [WakilService],
  controllers: [WakilController],
})
export class WakilModule {}
