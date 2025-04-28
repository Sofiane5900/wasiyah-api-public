import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeRoleUserByMusi1745842383378 implements MigrationInterface {
  name = 'ChangeRoleUserByMusi1745842383378';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."musi_roles_enum" RENAME TO "musi_roles_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."musi_roles_enum" AS ENUM('ROLE_ADMIN', 'ROLE_MUSI')`,
    );
    await queryRunner.query(
      `ALTER TABLE "musi" ALTER COLUMN "roles" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "musi" ALTER COLUMN "roles" TYPE "public"."musi_roles_enum" USING "roles"::"text"::"public"."musi_roles_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "musi" ALTER COLUMN "roles" SET DEFAULT 'ROLE_MUSI'`,
    );
    await queryRunner.query(`DROP TYPE "public"."musi_roles_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."musi_roles_enum_old" AS ENUM('ROLE_ADMIN', 'ROLE_USER')`,
    );
    await queryRunner.query(
      `ALTER TABLE "musi" ALTER COLUMN "roles" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "musi" ALTER COLUMN "roles" TYPE "public"."musi_roles_enum_old" USING "roles"::"text"::"public"."musi_roles_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "musi" ALTER COLUMN "roles" SET DEFAULT 'ROLE_USER'`,
    );
    await queryRunner.query(`DROP TYPE "public"."musi_roles_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."musi_roles_enum_old" RENAME TO "musi_roles_enum"`,
    );
  }
}
