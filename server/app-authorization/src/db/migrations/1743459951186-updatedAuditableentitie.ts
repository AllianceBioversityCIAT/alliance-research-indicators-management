import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedAuditableentitie1743459951186
  implements MigrationInterface
{
  name = 'UpdatedAuditableentitie1743459951186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_refresh_tokens\` ADD \`deleted_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_focus\` ADD \`deleted_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_element_types\` ADD \`deleted_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` ADD \`deleted_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` ADD \`deleted_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_endpoint_permissions\` ADD \`deleted_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_endpoint_permissions\` ADD \`deleted_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_role_contracts\` ADD \`deleted_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_roles\` ADD \`deleted_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD \`deleted_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_status\` ADD \`deleted_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_users\` ADD \`deleted_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_role_results\` ADD \`deleted_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_entity_types\` ADD \`deleted_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entities\` ADD \`deleted_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_template\` ADD \`deleted_at\` timestamp NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_template\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entities\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_entity_types\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_role_results\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_users\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_status\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_roles\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_role_contracts\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_endpoint_permissions\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_endpoint_permissions\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_element_types\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_focus\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_refresh_tokens\` DROP COLUMN \`deleted_at\``,
    );
  }
}
