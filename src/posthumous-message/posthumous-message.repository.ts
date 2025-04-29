import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { DataSource } from 'typeorm';
import { PosthumousMessage } from './posthumous-mesage.entity';

@Injectable()
export class PosthumousMessageRepository extends ServiceEntityRepository<PosthumousMessage> {
  constructor(private readonly dataSource: DataSource) {
    super(PosthumousMessage, dataSource.createEntityManager());
  }

  // Méthode d'exemple, tu peux l'adapter ou en ajouter d'autres
  /*async findByExampleField(value: string): Promise<PosthumousMessage | null> {
    return this.findOneBy({ value });
  }*/
}
