import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746638897176 implements MigrationInterface {
  name = 'Migrations1746638897176';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reset_password" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "expires_at" TIMESTAMP NOT NULL, "token" character varying(64) NOT NULL, "selector" character varying(32) NOT NULL, "musi_id" uuid, CONSTRAINT "PK_82bffbeb85c5b426956d004a8f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "reset_password" ADD CONSTRAINT "FK_3c4d27be24f952cc123d5467b7b" FOREIGN KEY ("musi_id") REFERENCES "musi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reset_password" DROP CONSTRAINT "FK_3c4d27be24f952cc123d5467b7b"`,
    );
    await queryRunner.query(`DROP TABLE "reset_password"`);
  }
}
