import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { ServiceEntityRepository } from '../common/abstract/abstract-service-entity.repository';

@Injectable()
export class UserRepository extends ServiceEntityRepository<User> {}
