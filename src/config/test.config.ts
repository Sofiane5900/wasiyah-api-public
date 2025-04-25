import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { UserModule } from '../user/user.module';

export async function setupTestingModule(): Promise<TestingModule> {
  return await Test.createTestingModule({
    imports: [
      await ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'database_user',
        password: 'database_pass',
        database: 'wasiyah_db_test',
        synchronize: true,
      }),
      TypeOrmModule.forFeature([UserRepository]),
      UserModule,
    ],
  }).compile();
}
