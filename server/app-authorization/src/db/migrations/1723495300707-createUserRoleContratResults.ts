import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRoleContratResults1723495300707
  implements MigrationInterface
{
  name = 'CreateUserRoleContratResults1723495300707';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP FOREIGN KEY \`FK_ecfbb29c70acc3e54e5d4ee408b\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_user_role_results\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_user_role_result_id\` bigint NOT NULL AUTO_INCREMENT, \`user_id\` bigint NOT NULL, \`role_id\` bigint NOT NULL, \`result_id\` bigint NULL, PRIMARY KEY (\`sec_user_role_result_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_user_role_contracts\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_user_role_contract_id\` bigint NOT NULL AUTO_INCREMENT, \`user_id\` bigint NOT NULL, \`role_id\` bigint NOT NULL, \`contract_id\` varchar(35) NOT NULL, PRIMARY KEY (\`sec_user_role_contract_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP COLUMN \`organizational_entity_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_role_results\` ADD CONSTRAINT \`FK_64bb680d6b8468c45ba35bb27ef\` FOREIGN KEY (\`user_id\`, \`role_id\`) REFERENCES \`sec_user_roles\`(\`user_id\`,\`role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_role_contracts\` ADD CONSTRAINT \`FK_141e63da220ad3e227b95f83914\` FOREIGN KEY (\`user_id\`, \`role_id\`) REFERENCES \`sec_user_roles\`(\`user_id\`,\`role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_user_role_contracts\` DROP FOREIGN KEY \`FK_141e63da220ad3e227b95f83914\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_role_results\` DROP FOREIGN KEY \`FK_64bb680d6b8468c45ba35bb27ef\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD \`organizational_entity_id\` bigint NULL`,
    );
    await queryRunner.query(`DROP TABLE \`sec_user_role_contracts\``);
    await queryRunner.query(`DROP TABLE \`sec_user_role_results\``);
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD CONSTRAINT \`FK_ecfbb29c70acc3e54e5d4ee408b\` FOREIGN KEY (\`organizational_entity_id\`) REFERENCES \`sec_organizational_entities\`(\`sec_organizational_entity_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
