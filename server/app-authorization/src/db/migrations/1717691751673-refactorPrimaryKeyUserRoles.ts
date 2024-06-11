import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorPrimaryKeyUserRoles1717691751673
  implements MigrationInterface
{
  name = 'RefactorPrimaryKeyUserRoles1717691751673';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` CHANGE \`sec_user_role_id\` \`sec_user_role_id\` bigint NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`sec_user_roles\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP COLUMN \`sec_user_role_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD \`created_by\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD \`updated_by\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD PRIMARY KEY (\`user_id\`, \`role_id\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sec_user_roles\` DROP PRIMARY KEY`);
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP COLUMN \`is_active\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP COLUMN \`updated_by\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP COLUMN \`created_by\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD \`sec_user_role_id\` bigint NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD PRIMARY KEY (\`sec_user_role_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` CHANGE \`sec_user_role_id\` \`sec_user_role_id\` bigint NOT NULL AUTO_INCREMENT`,
    );
  }
}
