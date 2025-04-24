import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1745477170772 implements MigrationInterface {
  name = 'Migrations1745477170772';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "death" ("id" uuid NOT NULL, "validation_status" character varying(50) NOT NULL, "contestation" boolean NOT NULL, "declaration_date" TIMESTAMP NOT NULL, "Id_User" integer NOT NULL, "userId" uuid, CONSTRAINT "UQ_c329705593b6d9b247fd0b4c377" UNIQUE ("Id_User"), CONSTRAINT "REL_3314101d05fb309bb1810a3ae8" UNIQUE ("userId"), CONSTRAINT "PK_03a9cda39d49f38ed85f9bb831a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "declare" ("wakilId" uuid NOT NULL, "deathId" uuid NOT NULL, "death_validation_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_c2376c0fd61e8eaf4de9605b07d" PRIMARY KEY ("wakilId", "deathId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "wakil" ("id" uuid NOT NULL, "last_name" character varying(50) NOT NULL, "first_name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "trust_score" integer NOT NULL, CONSTRAINT "PK_2bab78e498a26ddc8aeb31a46e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "appoint" ("UserId" uuid NOT NULL, "wakilId" uuid NOT NULL, "designation_date" TIMESTAMP NOT NULL, "relation_type" character varying(50) NOT NULL, "relation_seniority" integer NOT NULL, "is_valid" boolean NOT NULL DEFAULT false, "is_revoked" boolean NOT NULL DEFAULT false, "revocation_date" character varying(50) NOT NULL, "Id_User" uuid, "Id_WAKIL" uuid, CONSTRAINT "PK_5432f4aa4b30ad96c158c1e1c28" PRIMARY KEY ("UserId", "wakilId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "repayement" ("id" uuid NOT NULL, "amount" integer NOT NULL, "repayment_date" TIMESTAMP NOT NULL, "proof_url" character varying(50) NOT NULL, "Id_LOAN" integer NOT NULL, "loanId" uuid, CONSTRAINT "PK_0b542b189541d897188fabd9a2b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "loan" ("id" uuid NOT NULL, "nature" character varying(50) NOT NULL, "creditor_name" character varying(50) NOT NULL, "amount" numeric(15,2) NOT NULL, "loan_date" TIMESTAMP NOT NULL, "due_date" TIMESTAMP NOT NULL, "forgiven_after_death" boolean NOT NULL, "witnesses" character varying(50) NOT NULL, "proof_url" character varying(50) NOT NULL, "is_loan" boolean NOT NULL, "is_material" boolean NOT NULL, "Id_User" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_4ceda725a323d254a5fd48bf95f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "posthumousMessage" ("id" uuid NOT NULL, "recipient_email" character varying(50) NOT NULL, "title" character varying(50) NOT NULL, "content" text NOT NULL, "creation_date" character varying(50) NOT NULL, "opened_after_death" boolean NOT NULL, "attachment_count" integer NOT NULL, "Id_User" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_54d0bb9723fadf3d24e424b31da" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "document" ("Id_DOCUMENT" integer NOT NULL, "file_name" character varying(50) NOT NULL, "document_type" character varying(50) NOT NULL, "size_mb" numeric(15,2) NOT NULL, "added_date" TIMESTAMP NOT NULL, "Id_COFFRE" integer NOT NULL, "safeId" uuid, CONSTRAINT "PK_c90330de6e48731dc245d46a560" PRIMARY KEY ("Id_DOCUMENT"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."safe_type_enum" AS ENUM('close_family', 'extended_family', 'close_friend', 'social', 'professional', 'institutional')`,
    );
    await queryRunner.query(
      `CREATE TABLE "safe" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, "type" "public"."safe_type_enum" NOT NULL DEFAULT 'close_family', "encrypted_content" character varying(50) NOT NULL, "Id_User" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_7c551d64e4cedf70d4d9e40a327" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "testament" ("Id_TESTAMENT" integer NOT NULL, "content" text NOT NULL, "creation_date" TIMESTAMP NOT NULL, "version" integer NOT NULL, "is_active" boolean NOT NULL, "recipient" character varying(50) NOT NULL, "Id_User" integer NOT NULL, "userId" uuid, CONSTRAINT "UQ_5fda48d937d23a153bc4c333940" UNIQUE ("Id_User"), CONSTRAINT "REL_3b554d7760ee13eea64d844088" UNIQUE ("userId"), CONSTRAINT "PK_84b01e2d0b6aaaa00c78939fe86" PRIMARY KEY ("Id_TESTAMENT"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "birth_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "creation_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "two_factor_enabled_" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_status_enum" AS ENUM('active', 'inactive', 'pending')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "status" "public"."user_status_enum" NOT NULL DEFAULT 'pending'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "organDonor" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "firstName" character varying(50) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastName" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "death" ADD CONSTRAINT "FK_3314101d05fb309bb1810a3ae83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "declare" ADD CONSTRAINT "FK_01e90872536c4b80792785b2a9f" FOREIGN KEY ("wakilId") REFERENCES "wakil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "declare" ADD CONSTRAINT "FK_7588bb2a24a69d97ebdd3fb086e" FOREIGN KEY ("deathId") REFERENCES "death"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" ADD CONSTRAINT "FK_747cdae43592e9721d6f673a7da" FOREIGN KEY ("Id_User") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" ADD CONSTRAINT "FK_e0fc377b36fc557aa6e44fa8718" FOREIGN KEY ("Id_WAKIL") REFERENCES "wakil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "repayement" ADD CONSTRAINT "FK_8ffffa1403cebc596f1dd0950a1" FOREIGN KEY ("loanId") REFERENCES "loan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD CONSTRAINT "FK_ef7a63b4c4f0edd90e389edb103" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" ADD CONSTRAINT "FK_4bf1e8c5a2777d18fd7992ee839" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD CONSTRAINT "FK_f3a628b708aadf16075a2a19ac2" FOREIGN KEY ("safeId") REFERENCES "safe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "safe" ADD CONSTRAINT "FK_c55240e6771e58737e180b68a25" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "testament" ADD CONSTRAINT "FK_3b554d7760ee13eea64d844088b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "testament" DROP CONSTRAINT "FK_3b554d7760ee13eea64d844088b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "safe" DROP CONSTRAINT "FK_c55240e6771e58737e180b68a25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" DROP CONSTRAINT "FK_f3a628b708aadf16075a2a19ac2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" DROP CONSTRAINT "FK_4bf1e8c5a2777d18fd7992ee839"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" DROP CONSTRAINT "FK_ef7a63b4c4f0edd90e389edb103"`,
    );
    await queryRunner.query(
      `ALTER TABLE "repayement" DROP CONSTRAINT "FK_8ffffa1403cebc596f1dd0950a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" DROP CONSTRAINT "FK_e0fc377b36fc557aa6e44fa8718"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" DROP CONSTRAINT "FK_747cdae43592e9721d6f673a7da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "declare" DROP CONSTRAINT "FK_7588bb2a24a69d97ebdd3fb086e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "declare" DROP CONSTRAINT "FK_01e90872536c4b80792785b2a9f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "death" DROP CONSTRAINT "FK_3314101d05fb309bb1810a3ae83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastName" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "firstName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "organDonor"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "two_factor_enabled_"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "creation_date"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birth_date"`);
    await queryRunner.query(`DROP TABLE "testament"`);
    await queryRunner.query(`DROP TABLE "safe"`);
    await queryRunner.query(`DROP TYPE "public"."safe_type_enum"`);
    await queryRunner.query(`DROP TABLE "document"`);
    await queryRunner.query(`DROP TABLE "posthumousMessage"`);
    await queryRunner.query(`DROP TABLE "loan"`);
    await queryRunner.query(`DROP TABLE "repayement"`);
    await queryRunner.query(`DROP TABLE "appoint"`);
    await queryRunner.query(`DROP TABLE "wakil"`);
    await queryRunner.query(`DROP TABLE "declare"`);
    await queryRunner.query(`DROP TABLE "death"`);
  }
}
