import { ObjectLiteral, Repository } from 'typeorm';

export abstract class ServiceEntityRepository<
  T extends ObjectLiteral,
> extends Repository<T> {
  public async findAll(): Promise<T[]> {
    return await this.find();
  }
}
