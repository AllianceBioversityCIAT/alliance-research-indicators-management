import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEndpointPermissions1718984424458
  implements MigrationInterface
{
  name = 'CreateEndpointPermissions1718984424458';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`sec_endpoint_permissions\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_endpoint_permissions_id\` bigint NOT NULL AUTO_INCREMENT, \`endpoint\` text NOT NULL, PRIMARY KEY (\`sec_endpoint_permissions_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_role_endpoint_permissions\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_role_endpoint_permissions_id\` bigint NOT NULL AUTO_INCREMENT, \`role_id\` bigint NOT NULL, \`endpoint_permissions_id\` bigint NOT NULL, PRIMARY KEY (\`sec_role_endpoint_permissions_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_endpoint_permissions\` ADD CONSTRAINT \`FK_ef556eeaee16bac001e0c24e693\` FOREIGN KEY (\`endpoint_permissions_id\`) REFERENCES \`sec_endpoint_permissions\`(\`sec_endpoint_permissions_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_endpoint_permissions\` ADD CONSTRAINT \`FK_407d144cc8e6ad98bcb81f405f7\` FOREIGN KEY (\`role_id\`) REFERENCES \`sec_roles\`(\`sec_role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`DROP TABLE \`sec_permissions\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_role_endpoint_permissions\` DROP FOREIGN KEY \`FK_407d144cc8e6ad98bcb81f405f7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_endpoint_permissions\` DROP FOREIGN KEY \`FK_ef556eeaee16bac001e0c24e693\``,
    );
    await queryRunner.query(`DROP TABLE \`sec_role_endpoint_permissions\``);
    await queryRunner.query(`DROP TABLE \`sec_endpoint_permissions\``);
  }
}
