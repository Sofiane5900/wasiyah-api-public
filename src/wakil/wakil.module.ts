import { forwardRef, Module } from '@nestjs/common';
import { WakilService } from './wakil.service';
import { WakilController } from './wakil.controller';
import { DeclareModule } from 'src/declare/declare.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wakil } from './wakil.entity';
import { WakilRepository } from './wakil.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Wakil]), forwardRef(() => DeclareModule)],
  providers: [
    WakilService,
    {
      provide: WakilRepository,
      useFactory: (dataSource: DataSource) => {
        return new WakilRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  controllers: [WakilController],
  exports: [WakilRepository],
})
export class WakilModule {}
