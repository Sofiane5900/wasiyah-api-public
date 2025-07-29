import { MigrationInterface, QueryRunner } from 'typeorm';

export class Session1753623551836 implements MigrationInterface {
  name = 'Session1753623551836';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date_time_stamp" TIMESTAMP NOT NULL, "ip_adress" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_30e98e8746699fb9af235410aff" FOREIGN KEY ("user_id") REFERENCES "musi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_30e98e8746699fb9af235410aff"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
  }
}
