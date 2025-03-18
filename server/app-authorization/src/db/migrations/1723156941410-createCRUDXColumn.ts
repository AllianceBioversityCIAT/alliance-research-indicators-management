import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCRUDXColumn1723156941410 implements MigrationInterface {
  name = 'CreateCRUDXColumn1723156941410';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` DROP COLUMN \`write\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` ADD \`create\` enum ('true', 'false', 'N/A') NOT NULL DEFAULT 'false'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` ADD \`read\` enum ('true', 'false', 'N/A') NOT NULL DEFAULT 'false'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` ADD \`update\` enum ('true', 'false', 'N/A') NOT NULL DEFAULT 'false'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` ADD \`delete\` enum ('true', 'false', 'N/A') NOT NULL DEFAULT 'false'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` ADD \`execute\` enum ('true', 'false', 'N/A') NOT NULL DEFAULT 'false'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` DROP COLUMN \`execute\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` DROP COLUMN \`delete\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` DROP COLUMN \`update\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` DROP COLUMN \`read\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` DROP COLUMN \`create\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` ADD \`write\` tinyint NOT NULL DEFAULT '0'`,
    );
  }
}
