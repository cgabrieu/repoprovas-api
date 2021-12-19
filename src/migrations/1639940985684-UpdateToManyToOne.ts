import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateToManyToOne1639940985684 implements MigrationInterface {
    name = 'UpdateToManyToOne1639940985684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_3a4e54902753a8b6415963a3ea6"`);
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_af99930c4bdce16544496de5f7c"`);
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "REL_3a4e54902753a8b6415963a3ea"`);
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "REL_af99930c4bdce16544496de5f7"`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_3a4e54902753a8b6415963a3ea6" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_af99930c4bdce16544496de5f7c" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_af99930c4bdce16544496de5f7c"`);
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_3a4e54902753a8b6415963a3ea6"`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "REL_af99930c4bdce16544496de5f7" UNIQUE ("class_id")`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "REL_3a4e54902753a8b6415963a3ea" UNIQUE ("teacher_id")`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_af99930c4bdce16544496de5f7c" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_3a4e54902753a8b6415963a3ea6" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
