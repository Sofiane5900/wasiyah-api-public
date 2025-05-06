import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './document.entity';
import { DocumentRepository } from './document.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  providers: [
    DocumentService,
    {
      provide: DocumentRepository,
      useFactory: (dataSource: DataSource) => {
        return new DocumentRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  controllers: [DocumentController],
  exports: [DocumentRepository],
})
export class DocumentModule {}
