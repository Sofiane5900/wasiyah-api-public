import { Injectable } from '@nestjs/common';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';
import { User } from './user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends ServiceEntityRepository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  // Méthode d'exemple, tu peux l'adapter ou en ajouter d'autres
  /*async findByExampleField(value: string): Promise<User | null> {
    return this.findOne({ where: { value } });
  }*/
}
