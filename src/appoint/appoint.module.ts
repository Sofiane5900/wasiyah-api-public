import { forwardRef, Module } from '@nestjs/common';
import { AppointController } from './appoint.controller';
import { AppointService } from './appoint.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusiModule } from '../musi/musi.module';
import { Appoint } from './appoint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appoint]), forwardRef(() => MusiModule)],
  controllers: [AppointController],
  providers: [AppointService],
})
export class AppointModule {}
