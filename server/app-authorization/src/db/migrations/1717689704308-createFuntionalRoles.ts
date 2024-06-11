import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFuntionalRoles1717689704308 implements MigrationInterface {
  name = 'CreateFuntionalRoles1717689704308';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`sec_component_types\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`justification_update\` text NULL, \`sec_component_type_id\` bigint NOT NULL AUTO_INCREMENT, \`component_type_code\` text NOT NULL, PRIMARY KEY (\`sec_component_type_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_role_functional_permissions\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_role_functional_permission_id\` bigint NOT NULL AUTO_INCREMENT, \`role_id\` bigint NOT NULL, \`view_configuration_id\` bigint NOT NULL, PRIMARY KEY (\`sec_role_functional_permission_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_view_configurations\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_view_configuration_id\` bigint NOT NULL AUTO_INCREMENT, \`component_code\` varchar(100) NOT NULL, \`title\` text NULL, \`description\` text NULL, \`configurations\` json NULL, \`position\` int NOT NULL, \`hidden\` tinyint NOT NULL DEFAULT 0, \`parent_id\` bigint NULL, PRIMARY KEY (\`sec_view_configuration_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_view_components\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_view_component_id\` varchar(100) NOT NULL, \`component_type_id\` bigint NOT NULL, PRIMARY KEY (\`sec_view_component_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` ADD CONSTRAINT \`FK_5518874fe235ff5f4ab50d0b72d\` FOREIGN KEY (\`role_id\`) REFERENCES \`sec_roles\`(\`sec_role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` ADD CONSTRAINT \`FK_baff5dce061e1ed061557513fda\` FOREIGN KEY (\`view_configuration_id\`) REFERENCES \`sec_view_configurations\`(\`sec_view_configuration_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` ADD CONSTRAINT \`FK_a48e4911b1e76b1f849b4ec33d3\` FOREIGN KEY (\`component_code\`) REFERENCES \`sec_view_components\`(\`sec_view_component_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` ADD CONSTRAINT \`FK_e885ab021c1b6ab2dea69432907\` FOREIGN KEY (\`parent_id\`) REFERENCES \`sec_view_configurations\`(\`sec_view_configuration_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_components\` ADD CONSTRAINT \`FK_e592959647ef922341d1cbd836d\` FOREIGN KEY (\`component_type_id\`) REFERENCES \`sec_component_types\`(\`sec_component_type_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_view_components\` DROP FOREIGN KEY \`FK_e592959647ef922341d1cbd836d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` DROP FOREIGN KEY \`FK_e885ab021c1b6ab2dea69432907\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` DROP FOREIGN KEY \`FK_a48e4911b1e76b1f849b4ec33d3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` DROP FOREIGN KEY \`FK_baff5dce061e1ed061557513fda\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` DROP FOREIGN KEY \`FK_5518874fe235ff5f4ab50d0b72d\``,
    );
    await queryRunner.query(`DROP TABLE \`sec_view_components\``);
    await queryRunner.query(`DROP TABLE \`sec_view_configurations\``);
    await queryRunner.query(`DROP TABLE \`sec_role_functional_permissions\``);
    await queryRunner.query(`DROP TABLE \`sec_component_types\``);
  }
}
