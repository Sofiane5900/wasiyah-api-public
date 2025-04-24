import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1745490936849 implements MigrationInterface {
  name = 'Migrations1745490936849';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "declare" RENAME COLUMN "death_validation_date" TO "deathValidationDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "testament" DROP COLUMN "creation_date"`,
    );
    await queryRunner.query(`ALTER TABLE "testament" DROP COLUMN "is_active"`);
    await queryRunner.query(
      `ALTER TABLE "testament" DROP CONSTRAINT "UQ_5fda48d937d23a153bc4c333940"`,
    );
    await queryRunner.query(`ALTER TABLE "testament" DROP COLUMN "Id_User"`);
    await queryRunner.query(
      `ALTER TABLE "death" DROP COLUMN "validation_status"`,
    );
    await queryRunner.query(
      `ALTER TABLE "death" DROP COLUMN "declaration_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "death" DROP CONSTRAINT "UQ_c329705593b6d9b247fd0b4c377"`,
    );
    await queryRunner.query(`ALTER TABLE "death" DROP COLUMN "Id_User"`);
    await queryRunner.query(`ALTER TABLE "wakil" DROP COLUMN "last_name"`);
    await queryRunner.query(`ALTER TABLE "wakil" DROP COLUMN "first_name"`);
    await queryRunner.query(`ALTER TABLE "wakil" DROP COLUMN "trust_score"`);
    await queryRunner.query(
      `ALTER TABLE "appoint" DROP COLUMN "designation_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" DROP COLUMN "relation_seniority"`,
    );
    await queryRunner.query(`ALTER TABLE "appoint" DROP COLUMN "is_valid"`);
    await queryRunner.query(`ALTER TABLE "appoint" DROP COLUMN "is_revoked"`);
    await queryRunner.query(
      `ALTER TABLE "appoint" DROP COLUMN "revocation_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" DROP COLUMN "recipient_email"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" DROP COLUMN "creation_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" DROP COLUMN "opened_after_death"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" DROP COLUMN "attachment_count"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" DROP COLUMN "Id_User"`,
    );
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "file_name"`);
    await queryRunner.query(
      `ALTER TABLE "document" DROP COLUMN "document_type"`,
    );
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "size_mb"`);
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "added_date"`);
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "Id_COFFRE"`);
    await queryRunner.query(
      `ALTER TABLE "safe" DROP COLUMN "encrypted_content"`,
    );
    await queryRunner.query(`ALTER TABLE "safe" DROP COLUMN "Id_User"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birth_date"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "creation_date"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "two_factor_enabled_"`,
    );
    await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "creditor_name"`);
    await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "loan_date"`);
    await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "due_date"`);
    await queryRunner.query(
      `ALTER TABLE "loan" DROP COLUMN "forgiven_after_death"`,
    );
    await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "proof_url"`);
    await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "is_loan"`);
    await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "is_material"`);
    await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "Id_User"`);
    await queryRunner.query(
      `ALTER TABLE "repayement" DROP COLUMN "repayment_date"`,
    );
    await queryRunner.query(`ALTER TABLE "repayement" DROP COLUMN "proof_url"`);
    await queryRunner.query(`ALTER TABLE "repayement" DROP COLUMN "Id_LOAN"`);
    await queryRunner.query(
      `ALTER TABLE "testament" ADD "creationDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "testament" ADD "isActive" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "testament" ADD "UserId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "testament" ADD CONSTRAINT "UQ_352444f5ccb4df9466e0e59fc88" UNIQUE ("UserId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "death" ADD "validationStatus" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "death" ADD "declarationDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "death" ADD "UserId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "death" ADD CONSTRAINT "UQ_424e989a9cfa2e1999a04d7139b" UNIQUE ("UserId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "wakil" ADD "lastName" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "wakil" ADD "firstName" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "wakil" ADD "trustScore" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" ADD "designationDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" ADD "relationSeniority" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" ADD "isValid" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" ADD "isRevoked" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" ADD "revocationDate" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" ADD "recipientEmail" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" ADD "creationDate" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" ADD "openedAfterDeath" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" ADD "attachmentCount" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" ADD "UserId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD "fileName" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD "documentType" character varying(10) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD "sizeMb" numeric(15,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD "addedDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "safe" ADD "encryptedContent" character varying(50) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "safe" ADD "UserId" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "birthDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "creationDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "twoFactorEnabled" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "creditorName" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "loanDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "dueDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "forgivenAfterDeath" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "proofUrl" character varying(50) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "loan" ADD "isLoan" boolean NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "isMaterial" boolean NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "loan" ADD "UserId" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "repayement" ADD "repaymentDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "repayement" ADD "proofUrl" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" DROP COLUMN "relation_type"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."appoint_relation_type_enum" AS ENUM('close_family', 'extended_family', 'close_friend', 'social', 'professional', 'institutional')`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" ADD "relation_type" "public"."appoint_relation_type_enum" NOT NULL DEFAULT 'close_family'`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" DROP CONSTRAINT "FK_f3a628b708aadf16075a2a19ac2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ALTER COLUMN "safeId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."safe_type_enum" RENAME TO "safe_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."safe_type_enum" AS ENUM('family', 'personal', 'professional')`,
    );
    await queryRunner.query(
      `ALTER TABLE "safe" ALTER COLUMN "type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "safe" ALTER COLUMN "type" TYPE "public"."safe_type_enum" USING "type"::"text"::"public"."safe_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "safe" ALTER COLUMN "type" SET DEFAULT 'family'`,
    );
    await queryRunner.query(`DROP TYPE "public"."safe_type_enum_old"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying(50) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
    await queryRunner.query(
      `CREATE TYPE "public"."user_roles_enum" AS ENUM('ROLE_ADMIN', 'ROLE_USER')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "roles" "public"."user_roles_enum" NOT NULL DEFAULT 'ROLE_USER'`,
    );
    await queryRunner.query(
      `ALTER TABLE "repayement" DROP CONSTRAINT "FK_8ffffa1403cebc596f1dd0950a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "repayement" ALTER COLUMN "loanId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD CONSTRAINT "FK_f3a628b708aadf16075a2a19ac2" FOREIGN KEY ("safeId") REFERENCES "safe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "repayement" ADD CONSTRAINT "FK_8ffffa1403cebc596f1dd0950a1" FOREIGN KEY ("loanId") REFERENCES "loan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "repayement" DROP CONSTRAINT "FK_8ffffa1403cebc596f1dd0950a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" DROP CONSTRAINT "FK_f3a628b708aadf16075a2a19ac2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "repayement" ALTER COLUMN "loanId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "repayement" ADD CONSTRAINT "FK_8ffffa1403cebc596f1dd0950a1" FOREIGN KEY ("loanId") REFERENCES "loan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
    await queryRunner.query(`DROP TYPE "public"."user_roles_enum"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "roles" text NOT NULL DEFAULT '["ROLE_USER"]'`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."safe_type_enum_old" AS ENUM('close_family', 'extended_family', 'close_friend', 'social', 'professional', 'institutional')`,
    );
    await queryRunner.query(
      `ALTER TABLE "safe" ALTER COLUMN "type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "safe" ALTER COLUMN "type" TYPE "public"."safe_type_enum_old" USING "type"::"text"::"public"."safe_type_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "safe" ALTER COLUMN "type" SET DEFAULT 'close_family'`,
    );
    await queryRunner.query(`DROP TYPE "public"."safe_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."safe_type_enum_old" RENAME TO "safe_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ALTER COLUMN "safeId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD CONSTRAINT "FK_f3a628b708aadf16075a2a19ac2" FOREIGN KEY ("safeId") REFERENCES "safe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" DROP COLUMN "relation_type"`,
    );
    await queryRunner.query(`DROP TYPE "public"."appoint_relation_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "appoint" ADD "relation_type" character varying(50) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "repayement" DROP COLUMN "proofUrl"`);
    await queryRunner.query(
      `ALTER TABLE "repayement" DROP COLUMN "repaymentDate"`,
    );
    await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "UserId"`);
    await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "isMaterial"`);
    await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "isLoan"`);
    await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "proofUrl"`);
    await queryRunner.query(
      `ALTER TABLE "loan" DROP COLUMN "forgivenAfterDeath"`,
    );
    await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "dueDate"`);
    await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "loanDate"`);
    await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "creditorName"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "twoFactorEnabled"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "creationDate"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birthDate"`);
    await queryRunner.query(`ALTER TABLE "safe" DROP COLUMN "UserId"`);
    await queryRunner.query(
      `ALTER TABLE "safe" DROP COLUMN "encryptedContent"`,
    );
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "addedDate"`);
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "sizeMb"`);
    await queryRunner.query(
      `ALTER TABLE "document" DROP COLUMN "documentType"`,
    );
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "fileName"`);
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" DROP COLUMN "UserId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" DROP COLUMN "attachmentCount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" DROP COLUMN "openedAfterDeath"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" DROP COLUMN "creationDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" DROP COLUMN "recipientEmail"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" DROP COLUMN "revocationDate"`,
    );
    await queryRunner.query(`ALTER TABLE "appoint" DROP COLUMN "isRevoked"`);
    await queryRunner.query(`ALTER TABLE "appoint" DROP COLUMN "isValid"`);
    await queryRunner.query(
      `ALTER TABLE "appoint" DROP COLUMN "relationSeniority"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" DROP COLUMN "designationDate"`,
    );
    await queryRunner.query(`ALTER TABLE "wakil" DROP COLUMN "trustScore"`);
    await queryRunner.query(`ALTER TABLE "wakil" DROP COLUMN "firstName"`);
    await queryRunner.query(`ALTER TABLE "wakil" DROP COLUMN "lastName"`);
    await queryRunner.query(
      `ALTER TABLE "death" DROP CONSTRAINT "UQ_424e989a9cfa2e1999a04d7139b"`,
    );
    await queryRunner.query(`ALTER TABLE "death" DROP COLUMN "UserId"`);
    await queryRunner.query(
      `ALTER TABLE "death" DROP COLUMN "declarationDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "death" DROP COLUMN "validationStatus"`,
    );
    await queryRunner.query(
      `ALTER TABLE "testament" DROP CONSTRAINT "UQ_352444f5ccb4df9466e0e59fc88"`,
    );
    await queryRunner.query(`ALTER TABLE "testament" DROP COLUMN "UserId"`);
    await queryRunner.query(`ALTER TABLE "testament" DROP COLUMN "isActive"`);
    await queryRunner.query(
      `ALTER TABLE "testament" DROP COLUMN "creationDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "repayement" ADD "Id_LOAN" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "repayement" ADD "proof_url" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "repayement" ADD "repayment_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "Id_User" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "is_material" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "is_loan" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "proof_url" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "forgiven_after_death" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "due_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "loan_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD "creditor_name" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "two_factor_enabled_" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "creation_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "birth_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "safe" ADD "Id_User" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "safe" ADD "encrypted_content" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD "Id_COFFRE" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD "added_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD "size_mb" numeric(15,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD "document_type" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD "file_name" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" ADD "Id_User" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" ADD "attachment_count" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" ADD "opened_after_death" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" ADD "creation_date" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "posthumousMessage" ADD "recipient_email" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" ADD "revocation_date" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" ADD "is_revoked" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" ADD "is_valid" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" ADD "relation_seniority" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appoint" ADD "designation_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "wakil" ADD "trust_score" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "wakil" ADD "first_name" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "wakil" ADD "last_name" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "death" ADD "Id_User" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "death" ADD CONSTRAINT "UQ_c329705593b6d9b247fd0b4c377" UNIQUE ("Id_User")`,
    );
    await queryRunner.query(
      `ALTER TABLE "death" ADD "declaration_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "death" ADD "validation_status" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "testament" ADD "Id_User" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "testament" ADD CONSTRAINT "UQ_5fda48d937d23a153bc4c333940" UNIQUE ("Id_User")`,
    );
    await queryRunner.query(
      `ALTER TABLE "testament" ADD "is_active" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "testament" ADD "creation_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "declare" RENAME COLUMN "deathValidationDate" TO "death_validation_date"`,
    );
  }
}
