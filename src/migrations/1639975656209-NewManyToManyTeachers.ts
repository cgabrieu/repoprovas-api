import {MigrationInterface, QueryRunner} from "typeorm";

export class NewManyToManyTeachers1639975656209 implements MigrationInterface {
    name = 'NewManyToManyTeachers1639975656209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teachers_classes" ("teacher_id" integer NOT NULL, "class_id" integer NOT NULL, CONSTRAINT "PK_363a52edbc8e0927f8adefd7180" PRIMARY KEY ("teacher_id", "class_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e2d9a8a3e790e22d6444b66e20" ON "teachers_classes" ("teacher_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb02602bf13ed6c1b9152039e6" ON "teachers_classes" ("class_id") `);
        await queryRunner.query(`ALTER TABLE "teachers_classes" ADD CONSTRAINT "FK_e2d9a8a3e790e22d6444b66e201" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teachers_classes" ADD CONSTRAINT "FK_fb02602bf13ed6c1b9152039e66" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers_classes" DROP CONSTRAINT "FK_fb02602bf13ed6c1b9152039e66"`);
        await queryRunner.query(`ALTER TABLE "teachers_classes" DROP CONSTRAINT "FK_e2d9a8a3e790e22d6444b66e201"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb02602bf13ed6c1b9152039e6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2d9a8a3e790e22d6444b66e20"`);
        await queryRunner.query(`DROP TABLE "teachers_classes"`);
    }

}
