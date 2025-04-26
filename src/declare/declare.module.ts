import { Module, forwardRef } from '@nestjs/common';
import { DeclareController } from './declare.controller';
import { DeclareService } from './declare.service';
import { WakilModule } from '../wakil/wakil.module';

@Module({
  imports: [forwardRef(() => WakilModule)],
  controllers: [DeclareController],
  providers: [DeclareService],
})
export class DeclareModule {}
