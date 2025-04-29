import { forwardRef, Module } from '@nestjs/common';
import { AppointController } from './appoint.controller';
import { AppointService } from './appoint.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusiModule } from '../musi/musi.module';
import { Appoint } from './appoint.entity';
import { AppointRepository } from './appoint.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Appoint]), forwardRef(() => MusiModule)],
  controllers: [AppointController],
  providers: [
    AppointService,
    {
      provide: AppointRepository,
      useFactory: (dataSource: DataSource) => {
        return new AppointRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  exports: [AppointRepository],
})
export class AppointModule {}
