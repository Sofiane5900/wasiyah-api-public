import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorCreationDateMusi1746799788300
  implements MigrationInterface
{
  name = 'RefactorCreationDateMusi1746799788300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "musi" ALTER COLUMN "creation_date" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "musi" ALTER COLUMN "creation_date" DROP DEFAULT`,
    );
  }
}
