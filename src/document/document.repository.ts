import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { Document } from './document.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class DocumentRepository extends ServiceEntityRepository<Document> {
  constructor(private readonly dataSource: DataSource) {
    super(Document, dataSource.createEntityManager());
  }

  // Méthode d'exemple, tu peux l'adapter ou en ajouter d'autres
  /*async findByExampleField(value: string): Promise<Document | null> {
    return this.findOneBy({ value });
  }*/
}
