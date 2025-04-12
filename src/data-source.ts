import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'database_user',
  password: 'database_pass',
  database: 'wasiyah_db',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/**/*.ts'],
});
