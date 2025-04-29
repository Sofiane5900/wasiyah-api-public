import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testament } from './testament.entity';
import { MusiModule } from 'src/musi/musi.module';
import { TestamentRepository } from './testament.repository';
import { TestamentController } from './testament.controller';
import { TestamentService } from './testament.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Testament]),
    forwardRef(() => MusiModule),
  ],
  controllers: [TestamentController],
  providers: [
    TestamentService,
    {
      provide: TestamentRepository,
      useFactory: (dataSource: DataSource) => {
        return new TestamentRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  exports: [TestamentRepository],
})
export class TestamentModule {}
