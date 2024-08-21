import { MigrationInterface, QueryRunner } from "typeorm";

export class OnDeleteConfiguration1724188594287 implements MigrationInterface {
    name = 'OnDeleteConfiguration1724188594287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sec_role_functional_permissions\` DROP FOREIGN KEY \`FK_b2fecd88783807a25cdd13d965c\``);
        await queryRunner.query(`ALTER TABLE \`sec_role_functional_permissions\` ADD CONSTRAINT \`FK_b2fecd88783807a25cdd13d965c\` FOREIGN KEY (\`view_configuration_code\`) REFERENCES \`sec_view_configurations\`(\`sec_view_configuration_code\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sec_role_functional_permissions\` DROP FOREIGN KEY \`FK_b2fecd88783807a25cdd13d965c\``);
        await queryRunner.query(`ALTER TABLE \`sec_role_functional_permissions\` ADD CONSTRAINT \`FK_b2fecd88783807a25cdd13d965c\` FOREIGN KEY (\`view_configuration_code\`) REFERENCES \`sec_view_configurations\`(\`sec_view_configuration_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
