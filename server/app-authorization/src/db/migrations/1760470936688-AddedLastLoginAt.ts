import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedLastLoginAt1760470936688 implements MigrationInterface {
  name = 'AddedLastLoginAt1760470936688';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_users\` ADD \`last_login_at\` timestamp NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_users\` DROP COLUMN \`last_login_at\``,
    );
  }
}
