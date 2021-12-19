import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUniqueColumnToUnique1639942056177 implements MigrationInterface {
    name = 'UpdateUniqueColumnToUnique1639942056177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "UQ_d6f7fe84481b82eb1f3efdbb481" UNIQUE ("link")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "UQ_d6f7fe84481b82eb1f3efdbb481"`);
    }

}
