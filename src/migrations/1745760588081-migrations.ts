import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1745760588081 implements MigrationInterface {
  name = 'Migrations1745760588081';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "death" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "validation_status" character varying(50) NOT NULL, "contestation" boolean NOT NULL DEFAULT false, "declaration_date" TIMESTAMP NOT NULL, "user_id" uuid, CONSTRAINT "REL_3190bcd930284ecb0ae3cc4679" UNIQUE ("user_id"), CONSTRAINT "PK_03a9cda39d49f38ed85f9bb831a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "declare" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "death_validation_date" TIMESTAMP NOT NULL, "wakil_id" uuid, "death_id" uuid, CONSTRAINT "PK_20eb562c44be234ca4c50329ed9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "wakil" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "last_name" character varying(50) NOT NULL, "first_name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "trust_score" integer NOT NULL, CONSTRAINT "PK_2bab78e498a26ddc8aeb31a46e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."appoint_relation_type_enum" AS ENUM('close_family', 'extended_family', 'close_friend', 'social', 'professional', 'institutional')`,
    );
    await queryRunner.query(
      `CREATE TABLE "appoint" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "designation_date" TIMESTAMP NOT NULL, "relation_type" "public"."appoint_relation_type_enum" NOT NULL DEFAULT 'close_family', "relation_seniority" integer NOT NULL, "is_valid" boolean NOT NULL DEFAULT false, "is_revoked" boolean NOT NULL DEFAULT false, "revocation_date" TIMESTAMP, "user_id" uuid, "wakil_id" uuid, CONSTRAINT "PK_38940bbd068d7f15e10e573ec2c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "repayement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "repayment_date" TIMESTAMP NOT NULL, "proof_url" character varying(50) NOT NULL, "loan_id" uuid, CONSTRAINT "PK_0b542b189541d897188fabd9a2b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "loan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nature" character varying(50) NOT NULL, "creditor_name" character varying(50) NOT NULL, "amount" numeric(15,2) NOT NULL, "loan_date" TIMESTAMP NOT NULL, "due_date" TIMESTAMP NOT NULL, "forgiven_after_death" boolean NOT NULL, "witnesses" character varying(50) NOT NULL, "proof_url" character varying NOT NULL, "is_loan" character varying NOT NULL, "is_material" boolean NOT NULL, "user_id" uuid, CONSTRAINT "PK_4ceda725a323d254a5fd48bf95f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "posthumous_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "recipient_email" character varying(50) NOT NULL, "title" character varying(50) NOT NULL, "content" text NOT NULL, "creation_date" TIMESTAMP NOT NULL, "opened_after_death" boolean NOT NULL, "attachment_count" integer NOT NULL, "user_id" uuid, CONSTRAINT "PK_7be74b0ef93d36644c7896fe9c5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_name" character varying(50) NOT NULL, "document_type" character varying(10) NOT NULL, "size_mb" integer NOT NULL, "added_date" TIMESTAMP NOT NULL, "safe_id" uuid, CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."safe_type_enum" AS ENUM('family', 'personal', 'professional')`,
    );
    await queryRunner.query(
      `CREATE TABLE "safe" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "type" "public"."safe_type_enum" NOT NULL DEFAULT 'family', "encrypted_content" character varying(50) NOT NULL, "user_id" uuid, CONSTRAINT "PK_7c551d64e4cedf70d4d9e40a327" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_status_enum" AS ENUM('active', 'inactive', 'pending')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_roles_enum" AS ENUM('ROLE_ADMIN', 'ROLE_USER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "birth_date" TIMESTAMP NOT NULL, "creation_date" TIMESTAMP NOT NULL, "two_factor_enabled" boolean NOT NULL DEFAULT false, "is_email_verified" boolean NOT NULL DEFAULT false, "status" "public"."user_status_enum" NOT NULL DEFAULT 'pending', "organ_donor" boolean NOT NULL DEFAULT false, "roles" "public"."user_roles_enum" NOT NULL DEFAULT 'ROLE_USER', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "testament" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "creation_date" TIMESTAMP NOT NULL, "version" integer NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "recipient" character varying(50) NOT NULL, "user_id" uuid, CONSTRAINT "REL_331b3212716fe99fd71f2b64c5" UNIQUE ("user_id"), CONSTRAINT "PK_0da4a16536578a76b8ef8893a0b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "death" ADD CONSTRAINT "FK_3190bcd930284ecb0ae3cc4679e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "declare" ADD CONSTRAINT "FK_42b0317ebb745aabc3636f7bb69" FOREIGN KEY ("wakil_id") REFERENCES "wakil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "declare" ADD CONSTRAINT "FK_3b602f40605e764de397d924478" FOREIGN KEY ("death_id") REFERENCES "death"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" ADD CONSTRAINT "FK_a6b35eac89de7b0afe5e63027d7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" ADD CONSTRAINT "FK_ae7ea6d017b1f9799eee4ca0d99" FOREIGN KEY ("wakil_id") REFERENCES "wakil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "repayement" ADD CONSTRAINT "FK_1e2237a4dc4518a9ec3b9f9ffe7" FOREIGN KEY ("loan_id") REFERENCES "loan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD CONSTRAINT "FK_53e13d0f4512c420ceb586f6737" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumous_message" ADD CONSTRAINT "FK_b42003efbf04d2d3499cb603997" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD CONSTRAINT "FK_f716206d374e112cd6a2783b7d9" FOREIGN KEY ("safe_id") REFERENCES "safe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "safe" ADD CONSTRAINT "FK_ef6a61fafc45b340af97f92e486" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "testament" ADD CONSTRAINT "FK_331b3212716fe99fd71f2b64c5c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "testament" DROP CONSTRAINT "FK_331b3212716fe99fd71f2b64c5c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "safe" DROP CONSTRAINT "FK_ef6a61fafc45b340af97f92e486"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" DROP CONSTRAINT "FK_f716206d374e112cd6a2783b7d9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumous_message" DROP CONSTRAINT "FK_b42003efbf04d2d3499cb603997"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" DROP CONSTRAINT "FK_53e13d0f4512c420ceb586f6737"`,
    );
    await queryRunner.query(
      `ALTER TABLE "repayement" DROP CONSTRAINT "FK_1e2237a4dc4518a9ec3b9f9ffe7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" DROP CONSTRAINT "FK_ae7ea6d017b1f9799eee4ca0d99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" DROP CONSTRAINT "FK_a6b35eac89de7b0afe5e63027d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "declare" DROP CONSTRAINT "FK_3b602f40605e764de397d924478"`,
    );
    await queryRunner.query(
      `ALTER TABLE "declare" DROP CONSTRAINT "FK_42b0317ebb745aabc3636f7bb69"`,
    );
    await queryRunner.query(
      `ALTER TABLE "death" DROP CONSTRAINT "FK_3190bcd930284ecb0ae3cc4679e"`,
    );
    await queryRunner.query(`DROP TABLE "testament"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_roles_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    await queryRunner.query(`DROP TABLE "safe"`);
    await queryRunner.query(`DROP TYPE "public"."safe_type_enum"`);
    await queryRunner.query(`DROP TABLE "document"`);
    await queryRunner.query(`DROP TABLE "posthumous_message"`);
    await queryRunner.query(`DROP TABLE "loan"`);
    await queryRunner.query(`DROP TABLE "repayement"`);
    await queryRunner.query(`DROP TABLE "appoint"`);
    await queryRunner.query(`DROP TYPE "public"."appoint_relation_type_enum"`);
    await queryRunner.query(`DROP TABLE "wakil"`);
    await queryRunner.query(`DROP TABLE "declare"`);
    await queryRunner.query(`DROP TABLE "death"`);
  }
}
