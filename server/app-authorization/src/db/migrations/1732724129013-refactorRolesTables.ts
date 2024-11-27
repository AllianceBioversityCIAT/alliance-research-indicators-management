import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorRolesTables1732724129013 implements MigrationInterface {
  name = 'RefactorRolesTables1732724129013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`sec_user_role_contracts\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_user_role_contract_id\` bigint NOT NULL AUTO_INCREMENT, \`user_id\` bigint NOT NULL, \`role_id\` bigint NOT NULL, \`contract_id\` varchar(35) NOT NULL, PRIMARY KEY (\`sec_user_role_contract_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_user_role_results\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_user_role_result_id\` bigint NOT NULL AUTO_INCREMENT, \`user_id\` bigint NOT NULL, \`role_id\` bigint NOT NULL, \`result_id\` bigint NULL, PRIMARY KEY (\`sec_user_role_result_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_user_roles\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_user_role_id\` bigint NOT NULL AUTO_INCREMENT, \`user_id\` bigint NOT NULL, \`role_id\` bigint NOT NULL, PRIMARY KEY (\`sec_user_role_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_role_contracts\` ADD CONSTRAINT \`FK_140cb4cffa6b089e9a4ed98c974\` FOREIGN KEY (\`user_id\`) REFERENCES \`sec_users\`(\`sec_user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_role_contracts\` ADD CONSTRAINT \`FK_c97c293187f9441a5042fdfbb9a\` FOREIGN KEY (\`role_id\`) REFERENCES \`sec_roles\`(\`sec_role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_role_results\` ADD CONSTRAINT \`FK_0922064f9e8dcbf31aa632d133b\` FOREIGN KEY (\`user_id\`) REFERENCES \`sec_users\`(\`sec_user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_role_results\` ADD CONSTRAINT \`FK_ca49d90106dcd61de11e277d9dc\` FOREIGN KEY (\`role_id\`) REFERENCES \`sec_roles\`(\`sec_role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD CONSTRAINT \`FK_8934d8a0d6f1714bdd15e8343bb\` FOREIGN KEY (\`user_id\`) REFERENCES \`sec_users\`(\`sec_user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD CONSTRAINT \`FK_4bdf3256ec7d5b63ff875a2930c\` FOREIGN KEY (\`role_id\`) REFERENCES \`sec_roles\`(\`sec_role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP FOREIGN KEY \`FK_4bdf3256ec7d5b63ff875a2930c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP FOREIGN KEY \`FK_8934d8a0d6f1714bdd15e8343bb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_role_results\` DROP FOREIGN KEY \`FK_ca49d90106dcd61de11e277d9dc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_role_results\` DROP FOREIGN KEY \`FK_0922064f9e8dcbf31aa632d133b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_role_contracts\` DROP FOREIGN KEY \`FK_c97c293187f9441a5042fdfbb9a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_role_contracts\` DROP FOREIGN KEY \`FK_140cb4cffa6b089e9a4ed98c974\``,
    );
    await queryRunner.query(`DROP TABLE \`sec_user_roles\``);
    await queryRunner.query(`DROP TABLE \`sec_user_role_results\``);
    await queryRunner.query(`DROP TABLE \`sec_user_role_contracts\``);
  }
}
