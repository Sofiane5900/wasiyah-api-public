import { Module, forwardRef } from '@nestjs/common';
import { DeclareController } from './declare.controller';
import { DeclareService } from './declare.service';
import { WakilModule } from '../wakil/wakil.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Declare } from './declare.entity';
import { DeclareRepository } from './declare.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Declare]), forwardRef(() => WakilModule)],
  controllers: [DeclareController],
  providers: [
    DeclareService,
    {
      provide: DeclareRepository,
      useFactory: (dataSource: DataSource) => {
        return new DeclareRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  exports: [DeclareRepository],
})
export class DeclareModule {}
