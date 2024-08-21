import { MigrationInterface, QueryRunner } from "typeorm";

export class OnDeleteConfigurationParent1724188959974 implements MigrationInterface {
    name = 'OnDeleteConfigurationParent1724188959974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sec_view_configurations\` DROP FOREIGN KEY \`FK_e672820204f8cfaa202b59bae4d\``);
        await queryRunner.query(`ALTER TABLE \`sec_view_configurations\` ADD CONSTRAINT \`FK_e672820204f8cfaa202b59bae4d\` FOREIGN KEY (\`parentSecViewConfigurationCode\`) REFERENCES \`sec_view_configurations\`(\`sec_view_configuration_code\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sec_view_configurations\` DROP FOREIGN KEY \`FK_e672820204f8cfaa202b59bae4d\``);
        await queryRunner.query(`ALTER TABLE \`sec_view_configurations\` ADD CONSTRAINT \`FK_e672820204f8cfaa202b59bae4d\` FOREIGN KEY (\`parentSecViewConfigurationCode\`) REFERENCES \`sec_view_configurations\`(\`sec_view_configuration_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
