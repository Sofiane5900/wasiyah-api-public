import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsEmailVerified1745075154382 implements MigrationInterface {
  name = 'AddIsEmailVerified1745075154382';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isEmailVerified" boolean NOT NULL DEFAULT 'false'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isEmailVerified"`);
  }
}
