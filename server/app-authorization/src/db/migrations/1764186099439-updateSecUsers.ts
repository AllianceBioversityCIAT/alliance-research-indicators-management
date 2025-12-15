import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSecUsers1764186099439 implements MigrationInterface {
    name = 'UpdateSecUsers1764186099439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sec_users\` ADD \`carnet\` varchar(10) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sec_users\` DROP COLUMN \`carnet\``);
    }

}
