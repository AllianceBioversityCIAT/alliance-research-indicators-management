import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorEntityTypes1723150168934 implements MigrationInterface {
  name = 'RefactorEntityTypes1723150168934';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`sec_element_types\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`justification_update\` text NULL, \`sec_element_type_id\` bigint NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`can_create\` tinyint NOT NULL DEFAULT 0, \`can_read\` tinyint NOT NULL DEFAULT 0, \`can_update\` tinyint NOT NULL DEFAULT 0, \`can_delete\` tinyint NOT NULL DEFAULT 0, \`can_execute\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`sec_element_type_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`DROP TABLE \`sec_component_types\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`sec_element_types\``);
  }
}
