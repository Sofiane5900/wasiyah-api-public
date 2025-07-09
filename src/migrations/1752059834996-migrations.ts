import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1752059834996 implements MigrationInterface {
  name = 'Migrations1752059834996';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wakil" DROP COLUMN "last_name"`);
    await queryRunner.query(`ALTER TABLE "wakil" DROP COLUMN "first_name"`);
    await queryRunner.query(`ALTER TABLE "wakil" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "wakil" ADD "user_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "wakil" ADD CONSTRAINT "UQ_856f199a5ea585848766043269a" UNIQUE ("user_id")`,
    );
    await queryRunner.query(`ALTER TABLE "musi" DROP COLUMN "roles"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."musi_roles_enum"`);
    await queryRunner.query(`
  CREATE TYPE "public"."musi_roles_enum" AS ENUM ('ROLE_MUSI', 'ROLE_ADMIN_MUSI')
`);
    await queryRunner.query(`
  ALTER TABLE "musi" ADD "roles" "public"."musi_roles_enum"[] NOT NULL DEFAULT '{ROLE_MUSI}'
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wakil" DROP CONSTRAINT "FK_856f199a5ea585848766043269a"`,
    );
    await queryRunner.query(`ALTER TABLE "musi" DROP COLUMN "roles"`);
    await queryRunner.query(
      `CREATE TYPE "public"."musi_roles_enum" AS ENUM('ROLE_ADMIN', 'ROLE_MUSI')`,
    );
    await queryRunner.query(
      `ALTER TABLE "musi" ADD "roles" "public"."musi_roles_enum" NOT NULL DEFAULT 'ROLE_MUSI'`,
    );
    await queryRunner.query(
      `ALTER TABLE "wakil" DROP CONSTRAINT "UQ_856f199a5ea585848766043269a"`,
    );
    await queryRunner.query(`ALTER TABLE "wakil" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "wakil" ADD "email" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "wakil" ADD "first_name" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "wakil" ADD "last_name" character varying(50) NOT NULL`,
    );
  }
}
