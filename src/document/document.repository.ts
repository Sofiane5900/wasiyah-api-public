import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Document } from './document.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class DocumentRepository extends ServiceEntityRepository<Document> {
  constructor(private readonly dataSource: DataSource) {
    super(Document, dataSource.createEntityManager());
  }

  // Example method—you can adapt it or add others as needed.
  /*async findByExampleField(value: string): Promise<Document | null> {
    return this.findOneBy({ value });
  }*/
}
