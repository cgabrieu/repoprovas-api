import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1639842640065 implements MigrationInterface {
    name = 'CreateTables1639842640065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "period" integer NOT NULL, CONSTRAINT "CHK_b01a4177dc95b9a10eb38e352d" CHECK ("period" BETWEEN 1 AND 10), CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teachers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tests_type_enum" AS ENUM('P1', 'P2', 'P3', 'PF', '2ch', 'Outra')`);
        await queryRunner.query(`CREATE TABLE "tests" ("id" SERIAL NOT NULL, "year" integer NOT NULL, "semester" integer NOT NULL, "type" "public"."tests_type_enum" NOT NULL, "link" character varying(510) NOT NULL, "teacher_id" integer, "class_id" integer, CONSTRAINT "REL_3a4e54902753a8b6415963a3ea" UNIQUE ("teacher_id"), CONSTRAINT "REL_af99930c4bdce16544496de5f7" UNIQUE ("class_id"), CONSTRAINT "CHK_53d6f17a67e60e792c25d55dc7" CHECK ("semester" = 1 OR "semester" = 2), CONSTRAINT "CHK_49d5b5dc0c87afae733eab799a" CHECK ("year" BETWEEN 2015 AND 2030), CONSTRAINT "PK_4301ca51edf839623386860aed2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classes_courses" ("class_id" integer NOT NULL, "course_id" integer NOT NULL, CONSTRAINT "PK_1c207f073a913706d421944be45" PRIMARY KEY ("class_id", "course_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cbbfceecde8b1bab465c802d72" ON "classes_courses" ("class_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4d9218013aedef0b5458af6105" ON "classes_courses" ("course_id") `);
        await queryRunner.query(`CREATE TABLE "teachers_courses" ("teacher_id" integer NOT NULL, "course_id" integer NOT NULL, CONSTRAINT "PK_f8c2796082309e689f0f04e4830" PRIMARY KEY ("teacher_id", "course_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_de24937d225353aeff6d0337e2" ON "teachers_courses" ("teacher_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_8d81f85603d08f681a3547b2e2" ON "teachers_courses" ("course_id") `);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_3a4e54902753a8b6415963a3ea6" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_af99930c4bdce16544496de5f7c" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes_courses" ADD CONSTRAINT "FK_cbbfceecde8b1bab465c802d724" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "classes_courses" ADD CONSTRAINT "FK_4d9218013aedef0b5458af61053" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teachers_courses" ADD CONSTRAINT "FK_de24937d225353aeff6d0337e25" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teachers_courses" ADD CONSTRAINT "FK_8d81f85603d08f681a3547b2e24" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers_courses" DROP CONSTRAINT "FK_8d81f85603d08f681a3547b2e24"`);
        await queryRunner.query(`ALTER TABLE "teachers_courses" DROP CONSTRAINT "FK_de24937d225353aeff6d0337e25"`);
        await queryRunner.query(`ALTER TABLE "classes_courses" DROP CONSTRAINT "FK_4d9218013aedef0b5458af61053"`);
        await queryRunner.query(`ALTER TABLE "classes_courses" DROP CONSTRAINT "FK_cbbfceecde8b1bab465c802d724"`);
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_af99930c4bdce16544496de5f7c"`);
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_3a4e54902753a8b6415963a3ea6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8d81f85603d08f681a3547b2e2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_de24937d225353aeff6d0337e2"`);
        await queryRunner.query(`DROP TABLE "teachers_courses"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4d9218013aedef0b5458af6105"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cbbfceecde8b1bab465c802d72"`);
        await queryRunner.query(`DROP TABLE "classes_courses"`);
        await queryRunner.query(`DROP TABLE "tests"`);
        await queryRunner.query(`DROP TYPE "public"."tests_type_enum"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
        await queryRunner.query(`DROP TABLE "classes"`);
        await queryRunner.query(`DROP TABLE "courses"`);
    }

}
