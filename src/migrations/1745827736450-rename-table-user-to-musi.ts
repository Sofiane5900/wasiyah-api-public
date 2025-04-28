import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTableUserToMusi1745827736450 implements MigrationInterface {
    name = 'RenameTableUserToMusi1745827736450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "death" DROP CONSTRAINT "FK_3190bcd930284ecb0ae3cc4679e"`);
        await queryRunner.query(`ALTER TABLE "appoint" DROP CONSTRAINT "FK_a6b35eac89de7b0afe5e63027d7"`);
        await queryRunner.query(`ALTER TABLE "loan" DROP CONSTRAINT "FK_53e13d0f4512c420ceb586f6737"`);
        await queryRunner.query(`ALTER TABLE "posthumous_message" DROP CONSTRAINT "FK_b42003efbf04d2d3499cb603997"`);
        await queryRunner.query(`ALTER TABLE "safe" DROP CONSTRAINT "FK_ef6a61fafc45b340af97f92e486"`);
        await queryRunner.query(`ALTER TABLE "testament" DROP CONSTRAINT "FK_331b3212716fe99fd71f2b64c5c"`);
        await queryRunner.query(`CREATE TABLE "repayment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "repayment_date" TIMESTAMP NOT NULL, "proof_url" character varying(50) NOT NULL, "loan_id" uuid, CONSTRAINT "PK_73c2754ffb392d8ca8023f20ec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."musi_status_enum" AS ENUM('active', 'inactive', 'pending')`);
        await queryRunner.query(`CREATE TYPE "public"."musi_roles_enum" AS ENUM('ROLE_ADMIN', 'ROLE_USER')`);
        await queryRunner.query(`CREATE TABLE "musi" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "birth_date" TIMESTAMP NOT NULL, "creation_date" TIMESTAMP NOT NULL, "two_factor_enabled" boolean NOT NULL DEFAULT false, "is_email_verified" boolean NOT NULL DEFAULT false, "status" "public"."musi_status_enum" NOT NULL DEFAULT 'pending', "organ_donor" boolean NOT NULL DEFAULT false, "roles" "public"."musi_roles_enum" NOT NULL DEFAULT 'ROLE_USER', CONSTRAINT "UQ_498440640698ceaca8ea986b749" UNIQUE ("email"), CONSTRAINT "PK_3ba5615a6f57dc40b12b07f044f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "death" ADD CONSTRAINT "FK_3190bcd930284ecb0ae3cc4679e" FOREIGN KEY ("user_id") REFERENCES "musi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appoint" ADD CONSTRAINT "FK_a6b35eac89de7b0afe5e63027d7" FOREIGN KEY ("user_id") REFERENCES "musi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "repayment" ADD CONSTRAINT "FK_67c04d1d5efc04c0f8bfa3eea8e" FOREIGN KEY ("loan_id") REFERENCES "loan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan" ADD CONSTRAINT "FK_53e13d0f4512c420ceb586f6737" FOREIGN KEY ("user_id") REFERENCES "musi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posthumous_message" ADD CONSTRAINT "FK_b42003efbf04d2d3499cb603997" FOREIGN KEY ("user_id") REFERENCES "musi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "safe" ADD CONSTRAINT "FK_ef6a61fafc45b340af97f92e486" FOREIGN KEY ("user_id") REFERENCES "musi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "testament" ADD CONSTRAINT "FK_331b3212716fe99fd71f2b64c5c" FOREIGN KEY ("user_id") REFERENCES "musi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testament" DROP CONSTRAINT "FK_331b3212716fe99fd71f2b64c5c"`);
        await queryRunner.query(`ALTER TABLE "safe" DROP CONSTRAINT "FK_ef6a61fafc45b340af97f92e486"`);
        await queryRunner.query(`ALTER TABLE "posthumous_message" DROP CONSTRAINT "FK_b42003efbf04d2d3499cb603997"`);
        await queryRunner.query(`ALTER TABLE "loan" DROP CONSTRAINT "FK_53e13d0f4512c420ceb586f6737"`);
        await queryRunner.query(`ALTER TABLE "repayment" DROP CONSTRAINT "FK_67c04d1d5efc04c0f8bfa3eea8e"`);
        await queryRunner.query(`ALTER TABLE "appoint" DROP CONSTRAINT "FK_a6b35eac89de7b0afe5e63027d7"`);
        await queryRunner.query(`ALTER TABLE "death" DROP CONSTRAINT "FK_3190bcd930284ecb0ae3cc4679e"`);
        await queryRunner.query(`DROP TABLE "musi"`);
        await queryRunner.query(`DROP TYPE "public"."musi_roles_enum"`);
        await queryRunner.query(`DROP TYPE "public"."musi_status_enum"`);
        await queryRunner.query(`DROP TABLE "repayment"`);
        await queryRunner.query(`ALTER TABLE "testament" ADD CONSTRAINT "FK_331b3212716fe99fd71f2b64c5c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "safe" ADD CONSTRAINT "FK_ef6a61fafc45b340af97f92e486" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posthumous_message" ADD CONSTRAINT "FK_b42003efbf04d2d3499cb603997" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan" ADD CONSTRAINT "FK_53e13d0f4512c420ceb586f6737" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appoint" ADD CONSTRAINT "FK_a6b35eac89de7b0afe5e63027d7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "death" ADD CONSTRAINT "FK_3190bcd930284ecb0ae3cc4679e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
