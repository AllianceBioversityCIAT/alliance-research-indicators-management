import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRoleTable1776443271722 implements MigrationInterface {
    name = 'UpdateRoleTable1776443271722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sec_roles\` ADD \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`sec_roles\` ADD \`is_internal\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sec_roles\` DROP COLUMN \`is_internal\``);
        await queryRunner.query(`ALTER TABLE \`sec_roles\` DROP COLUMN \`description\``);
    }

}
