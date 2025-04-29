import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'database_user',
  password: 'database_pass',
  database: process.env.NODE_ENV !== 'test' ? 'wasiyah_db' : 'wasiyah_db_test',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/**/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
});
