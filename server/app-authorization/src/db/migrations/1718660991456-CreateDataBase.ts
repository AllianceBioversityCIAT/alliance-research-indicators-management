import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDataBase1718660991456 implements MigrationInterface {
  name = 'CreateDataBase1718660991456';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`sec_component_types\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`justification_update\` text NULL, \`sec_component_type_id\` bigint NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`sec_component_type_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_view_components\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_view_component_id\` varchar(100) NOT NULL, \`component_type_id\` bigint NOT NULL, PRIMARY KEY (\`sec_view_component_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_role_focus\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`justification_update\` text NULL, \`sec_role_focus_id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, PRIMARY KEY (\`sec_role_focus_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_refresh_tokens\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`refresh_token_code\` varchar(36) NOT NULL, \`user_id\` bigint NOT NULL, \`expires_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`refresh_token_code\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_users\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_user_id\` bigint NOT NULL AUTO_INCREMENT, \`first_name\` varchar(60) NOT NULL, \`last_name\` varchar(60) NOT NULL, \`email\` varchar(150) NOT NULL, PRIMARY KEY (\`sec_user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_entity_types\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`justification_update\` text NULL, \`sec_entity_type_id\` bigint NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`sec_entity_type_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_organizational_entities\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_organizational_entity_id\` bigint NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`parent_id\` bigint NOT NULL, \`entity_type_id\` bigint NOT NULL, PRIMARY KEY (\`sec_organizational_entity_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_user_roles\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`user_id\` bigint NOT NULL, \`role_id\` bigint NOT NULL, \`organizational_entity_id\` bigint NULL, PRIMARY KEY (\`user_id\`, \`role_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_roles\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`justification_update\` text NULL, \`sec_role_id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(60) NOT NULL, \`focus_id\` bigint NOT NULL, PRIMARY KEY (\`sec_role_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_role_functional_permissions\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_role_functional_permission_id\` bigint NOT NULL AUTO_INCREMENT, \`role_id\` bigint NOT NULL, \`view_configuration_code\` varchar(36) NOT NULL, \`write\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`sec_role_functional_permission_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_view_configurations\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_view_configuration_code\` varchar(36) NOT NULL, \`component_code\` varchar(100) NOT NULL, \`title\` text NULL, \`description\` text NULL, \`configurations\` json NULL, \`position\` int NOT NULL, \`hidden\` tinyint NOT NULL DEFAULT 0, \`parent_code\` varchar(36) NULL, \`parentSecViewConfigurationCode\` varchar(36) NULL, PRIMARY KEY (\`sec_view_configuration_code\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_permissions\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_permission_id\` bigint NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`sec_permission_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_view_configurations_closure\` (\`sec_view_configuration_code_ancestor\` varchar(36) NOT NULL, \`sec_view_configuration_code_descendant\` varchar(36) NOT NULL, INDEX \`IDX_b1252fe40ea37147aff15f9814\` (\`sec_view_configuration_code_ancestor\`), INDEX \`IDX_8da70cc07c55e6552e195706be\` (\`sec_view_configuration_code_descendant\`), PRIMARY KEY (\`sec_view_configuration_code_ancestor\`, \`sec_view_configuration_code_descendant\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_components\` ADD CONSTRAINT \`FK_e592959647ef922341d1cbd836d\` FOREIGN KEY (\`component_type_id\`) REFERENCES \`sec_component_types\`(\`sec_component_type_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_refresh_tokens\` ADD CONSTRAINT \`FK_10b96f26806d867fded46f26414\` FOREIGN KEY (\`user_id\`) REFERENCES \`sec_users\`(\`sec_user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entities\` ADD CONSTRAINT \`FK_9459e494f6aafabdb8bcb688f61\` FOREIGN KEY (\`parent_id\`) REFERENCES \`sec_organizational_entities\`(\`sec_organizational_entity_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entities\` ADD CONSTRAINT \`FK_4eb051f7629dda0a528a1e3846d\` FOREIGN KEY (\`entity_type_id\`) REFERENCES \`sec_entity_types\`(\`sec_entity_type_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD CONSTRAINT \`FK_8934d8a0d6f1714bdd15e8343bb\` FOREIGN KEY (\`user_id\`) REFERENCES \`sec_users\`(\`sec_user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD CONSTRAINT \`FK_4bdf3256ec7d5b63ff875a2930c\` FOREIGN KEY (\`role_id\`) REFERENCES \`sec_roles\`(\`sec_role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD CONSTRAINT \`FK_ecfbb29c70acc3e54e5d4ee408b\` FOREIGN KEY (\`organizational_entity_id\`) REFERENCES \`sec_organizational_entities\`(\`sec_organizational_entity_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_roles\` ADD CONSTRAINT \`FK_8d85c35e518326985ef3bff6409\` FOREIGN KEY (\`focus_id\`) REFERENCES \`sec_role_focus\`(\`sec_role_focus_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` ADD CONSTRAINT \`FK_5518874fe235ff5f4ab50d0b72d\` FOREIGN KEY (\`role_id\`) REFERENCES \`sec_roles\`(\`sec_role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` ADD CONSTRAINT \`FK_b2fecd88783807a25cdd13d965c\` FOREIGN KEY (\`view_configuration_code\`) REFERENCES \`sec_view_configurations\`(\`sec_view_configuration_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` ADD CONSTRAINT \`FK_a48e4911b1e76b1f849b4ec33d3\` FOREIGN KEY (\`component_code\`) REFERENCES \`sec_view_components\`(\`sec_view_component_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` ADD CONSTRAINT \`FK_e672820204f8cfaa202b59bae4d\` FOREIGN KEY (\`parentSecViewConfigurationCode\`) REFERENCES \`sec_view_configurations\`(\`sec_view_configuration_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations_closure\` ADD CONSTRAINT \`FK_b1252fe40ea37147aff15f9814a\` FOREIGN KEY (\`sec_view_configuration_code_ancestor\`) REFERENCES \`sec_view_configurations\`(\`sec_view_configuration_code\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations_closure\` ADD CONSTRAINT \`FK_8da70cc07c55e6552e195706be4\` FOREIGN KEY (\`sec_view_configuration_code_descendant\`) REFERENCES \`sec_view_configurations\`(\`sec_view_configuration_code\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations_closure\` DROP FOREIGN KEY \`FK_8da70cc07c55e6552e195706be4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations_closure\` DROP FOREIGN KEY \`FK_b1252fe40ea37147aff15f9814a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` DROP FOREIGN KEY \`FK_e672820204f8cfaa202b59bae4d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` DROP FOREIGN KEY \`FK_a48e4911b1e76b1f849b4ec33d3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` DROP FOREIGN KEY \`FK_b2fecd88783807a25cdd13d965c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_role_functional_permissions\` DROP FOREIGN KEY \`FK_5518874fe235ff5f4ab50d0b72d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_roles\` DROP FOREIGN KEY \`FK_8d85c35e518326985ef3bff6409\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP FOREIGN KEY \`FK_ecfbb29c70acc3e54e5d4ee408b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP FOREIGN KEY \`FK_4bdf3256ec7d5b63ff875a2930c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP FOREIGN KEY \`FK_8934d8a0d6f1714bdd15e8343bb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entities\` DROP FOREIGN KEY \`FK_4eb051f7629dda0a528a1e3846d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entities\` DROP FOREIGN KEY \`FK_9459e494f6aafabdb8bcb688f61\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_refresh_tokens\` DROP FOREIGN KEY \`FK_10b96f26806d867fded46f26414\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_components\` DROP FOREIGN KEY \`FK_e592959647ef922341d1cbd836d\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_8da70cc07c55e6552e195706be\` ON \`sec_view_configurations_closure\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b1252fe40ea37147aff15f9814\` ON \`sec_view_configurations_closure\``,
    );
    await queryRunner.query(`DROP TABLE \`sec_view_configurations_closure\``);
    await queryRunner.query(`DROP TABLE \`sec_permissions\``);
    await queryRunner.query(`DROP TABLE \`sec_view_configurations\``);
    await queryRunner.query(`DROP TABLE \`sec_role_functional_permissions\``);
    await queryRunner.query(`DROP TABLE \`sec_roles\``);
    await queryRunner.query(`DROP TABLE \`sec_user_roles\``);
    await queryRunner.query(`DROP TABLE \`sec_organizational_entities\``);
    await queryRunner.query(`DROP TABLE \`sec_entity_types\``);
    await queryRunner.query(`DROP TABLE \`sec_users\``);
    await queryRunner.query(`DROP TABLE \`sec_refresh_tokens\``);
    await queryRunner.query(`DROP TABLE \`sec_role_focus\``);
    await queryRunner.query(`DROP TABLE \`sec_view_components\``);
    await queryRunner.query(`DROP TABLE \`sec_component_types\``);
  }
}
