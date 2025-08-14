import { MigrationInterface, QueryRunner } from 'typeorm';

export class Session1754733085425 implements MigrationInterface {
  name = 'Session1754733085425';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" ADD "browser" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "session" ADD "os" character varying`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "device_type" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "device_model" character varying`,
    );
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
      `ALTER TABLE "musi" ALTER COLUMN "roles" TYPE "public"."musi_roles_enum"[] USING "roles"::"text"::"public"."musi_roles_enum"[]`,
    );
    await queryRunner.query(
      `ALTER TABLE "musi" ALTER COLUMN "roles" SET DEFAULT '{ROLE_MUSI}'`,
    );
    await queryRunner.query(`DROP TYPE "public"."musi_roles_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "wakil" ADD CONSTRAINT "FK_856f199a5ea585848766043269a" FOREIGN KEY ("user_id") REFERENCES "musi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wakil" DROP CONSTRAINT "FK_856f199a5ea585848766043269a"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."musi_roles_enum_old" AS ENUM('ROLE_MUSI', 'ROLE_ADMIN_MUSI')`,
    );
    await queryRunner.query(
      `ALTER TABLE "musi" ALTER COLUMN "roles" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "musi" ALTER COLUMN "roles" TYPE "public"."musi_roles_enum_old"[] USING "roles"::"text"::"public"."musi_roles_enum_old"[]`,
    );
    await queryRunner.query(
      `ALTER TABLE "musi" ALTER COLUMN "roles" SET DEFAULT '{ROLE_MUSI}'`,
    );
    await queryRunner.query(`DROP TYPE "public"."musi_roles_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."musi_roles_enum_old" RENAME TO "musi_roles_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "device_model"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "device_type"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "os"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "browser"`);
  }
}
