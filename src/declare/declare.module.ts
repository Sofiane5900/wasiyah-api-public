import { Module, forwardRef } from '@nestjs/common';
import { DeclareController } from './declare.controller';
import { DeclareService } from './declare.service';
import { WakilModule } from '../wakil/wakil.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Declare } from './declare.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Declare]), forwardRef(() => WakilModule)],
  controllers: [DeclareController],
  providers: [DeclareService],
})
export class DeclareModule {}
