import { forwardRef, Module } from '@nestjs/common';
import { WakilService } from './wakil.service';
import { WakilController } from './wakil.controller';
import { DeclareModule } from 'src/declare/declare.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wakil } from './wakil.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wakil]), forwardRef(() => DeclareModule)],
  providers: [WakilService],
  controllers: [WakilController],
})
export class WakilModule {}
