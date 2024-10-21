import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserStatusEnum } from '../../domain/entities/user-status/enum/user-status.enum';

export class AddedStatusUser1729523098902 implements MigrationInterface {
  name = 'AddedStatusUser1729523098902';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_status\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`user_status_id\` bigint NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`user_status_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_users\` ADD \`status_id\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_users\` CHANGE \`first_name\` \`first_name\` varchar(60) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_users\` CHANGE \`last_name\` \`last_name\` varchar(60) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_users\` ADD CONSTRAINT \`FK_20a43565a31e1df8234e4fefe7b\` FOREIGN KEY (\`status_id\`) REFERENCES \`user_status\`(\`user_status_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `INSERT INTO user_status (user_status_id, name) VALUES (${UserStatusEnum.ACCEPTED}, 'Accepted'), (${UserStatusEnum.PENDING}, 'Pending'), (${UserStatusEnum.REJECTED}, 'Rejected')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_users\` DROP FOREIGN KEY \`FK_20a43565a31e1df8234e4fefe7b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_users\` CHANGE \`last_name\` \`last_name\` varchar(60) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_users\` CHANGE \`first_name\` \`first_name\` varchar(60) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_users\` DROP COLUMN \`status_id\``,
    );
    await queryRunner.query(`DROP TABLE \`user_status\``);
  }
}
