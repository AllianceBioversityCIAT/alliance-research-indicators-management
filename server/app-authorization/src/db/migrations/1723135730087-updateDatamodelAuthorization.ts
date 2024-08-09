import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDatamodelAuthorization1723135730087
  implements MigrationInterface
{
  name = 'UpdateDatamodelAuthorization1723135730087';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` DROP FOREIGN KEY \`FK_a48e4911b1e76b1f849b4ec33d3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` DROP COLUMN \`component_code\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` DROP COLUMN \`title\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` DROP COLUMN \`description\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` DROP COLUMN \`configurations\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` DROP COLUMN \`position\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` DROP COLUMN \`hidden\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` DROP COLUMN \`parent_code\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` ADD \`client_element_code\` varchar(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` ADD \`element_type_id\` bigint NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS \`sec_view_components\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` DROP COLUMN \`element_type_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` DROP COLUMN \`client_element_code\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` ADD \`parent_code\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` ADD \`hidden\` tinyint NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` ADD \`position\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` ADD \`configurations\` json NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` ADD \`description\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` ADD \`title\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` ADD \`component_code\` varchar(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` ADD CONSTRAINT \`FK_a48e4911b1e76b1f849b4ec33d3\` FOREIGN KEY (\`component_code\`) REFERENCES \`sec_view_components\`(\`sec_view_component_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
