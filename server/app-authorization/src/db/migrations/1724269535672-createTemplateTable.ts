import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTemplateTable1724269535672 implements MigrationInterface {
  name = 'CreateTemplateTable1724269535672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`sec_template\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_template_id\` bigint NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`description\` text NULL, \`template\` text NOT NULL, \`parent_id\` bigint NULL, PRIMARY KEY (\`sec_template_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_template\` ADD CONSTRAINT \`FK_865ef44747b8f7c2f95a95c19b9\` FOREIGN KEY (\`parent_id\`) REFERENCES \`sec_template\`(\`sec_template_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_template\` DROP FOREIGN KEY \`FK_865ef44747b8f7c2f95a95c19b9\``,
    );
    await queryRunner.query(`DROP TABLE \`sec_template\``);
  }
}
