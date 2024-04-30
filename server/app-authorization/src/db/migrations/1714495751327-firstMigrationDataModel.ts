import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigrationDataModel1714495751327
  implements MigrationInterface
{
  name = 'FirstMigrationDataModel1714495751327';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`sec_role_focus\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`justification_update\` text NULL, \`sec_role_focus_id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, PRIMARY KEY (\`sec_role_focus_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_roles\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`justification_update\` text NULL, \`sec_role_id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(60) NOT NULL, \`focus_id\` bigint NOT NULL, PRIMARY KEY (\`sec_role_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_entity_types\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`justification_update\` text NULL, \`sec_entity_type_id\` bigint NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`sec_entity_type_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_organizational_entities\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_organizational_entity_id\` bigint NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`parent_id\` bigint NOT NULL, \`entity_type_id\` bigint NOT NULL, PRIMARY KEY (\`sec_organizational_entity_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_permissions\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_permission_id\` bigint NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`sec_permission_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_organizational_entity_role_permissions\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_organizational_entity_role_permission_id\` bigint NOT NULL AUTO_INCREMENT, \`permission_id\` bigint NOT NULL, \`organizational_entity_role_id\` bigint NOT NULL, PRIMARY KEY (\`sec_organizational_entity_role_permission_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_organizational_entity_roles\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_organizational_entity_role_id\` bigint NOT NULL AUTO_INCREMENT, \`role_id\` bigint NOT NULL, \`organizational_entity_id\` bigint NOT NULL, \`is_visible\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`sec_organizational_entity_role_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_user_organizational_entity_roles\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_user_organizational_entity_role_id\` bigint NOT NULL AUTO_INCREMENT, \`user_id\` bigint NOT NULL, \`organizational_entity_role_id\` bigint NOT NULL, PRIMARY KEY (\`sec_user_organizational_entity_role_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sec_users\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` bigint NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`sec_user_id\` bigint NOT NULL AUTO_INCREMENT, \`first_name\` varchar(60) NOT NULL, \`last_name\` varchar(60) NOT NULL, \`email\` varchar(150) NOT NULL, PRIMARY KEY (\`sec_user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_roles\` ADD CONSTRAINT \`FK_8d85c35e518326985ef3bff6409\` FOREIGN KEY (\`focus_id\`) REFERENCES \`sec_role_focus\`(\`sec_role_focus_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entities\` ADD CONSTRAINT \`FK_9459e494f6aafabdb8bcb688f61\` FOREIGN KEY (\`parent_id\`) REFERENCES \`sec_organizational_entities\`(\`sec_organizational_entity_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entities\` ADD CONSTRAINT \`FK_4eb051f7629dda0a528a1e3846d\` FOREIGN KEY (\`entity_type_id\`) REFERENCES \`sec_entity_types\`(\`sec_entity_type_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entity_role_permissions\` ADD CONSTRAINT \`FK_4dd9baff8ce15bd957e61293291\` FOREIGN KEY (\`organizational_entity_role_id\`) REFERENCES \`sec_organizational_entity_roles\`(\`sec_organizational_entity_role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entity_role_permissions\` ADD CONSTRAINT \`FK_ef9b85b0939f0daaede1099561e\` FOREIGN KEY (\`permission_id\`) REFERENCES \`sec_permissions\`(\`sec_permission_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entity_roles\` ADD CONSTRAINT \`FK_8771a4b42265aa8a66c04d27e2d\` FOREIGN KEY (\`organizational_entity_id\`) REFERENCES \`sec_organizational_entities\`(\`sec_organizational_entity_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entity_roles\` ADD CONSTRAINT \`FK_a0c968a9cc24fb26acea4ca27eb\` FOREIGN KEY (\`role_id\`) REFERENCES \`sec_roles\`(\`sec_role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_organizational_entity_roles\` ADD CONSTRAINT \`FK_1055939b51e978f93492b34ac1a\` FOREIGN KEY (\`user_id\`) REFERENCES \`sec_users\`(\`sec_user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_organizational_entity_roles\` ADD CONSTRAINT \`FK_2164a2da4ca040582afce5ca6d9\` FOREIGN KEY (\`organizational_entity_role_id\`) REFERENCES \`sec_organizational_entity_roles\`(\`sec_organizational_entity_role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_user_organizational_entity_roles\` DROP FOREIGN KEY \`FK_2164a2da4ca040582afce5ca6d9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_organizational_entity_roles\` DROP FOREIGN KEY \`FK_1055939b51e978f93492b34ac1a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entity_roles\` DROP FOREIGN KEY \`FK_a0c968a9cc24fb26acea4ca27eb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entity_roles\` DROP FOREIGN KEY \`FK_8771a4b42265aa8a66c04d27e2d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entity_role_permissions\` DROP FOREIGN KEY \`FK_ef9b85b0939f0daaede1099561e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entity_role_permissions\` DROP FOREIGN KEY \`FK_4dd9baff8ce15bd957e61293291\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entities\` DROP FOREIGN KEY \`FK_4eb051f7629dda0a528a1e3846d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_organizational_entities\` DROP FOREIGN KEY \`FK_9459e494f6aafabdb8bcb688f61\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_roles\` DROP FOREIGN KEY \`FK_8d85c35e518326985ef3bff6409\``,
    );
    await queryRunner.query(`DROP TABLE \`sec_users\``);
    await queryRunner.query(
      `DROP TABLE \`sec_user_organizational_entity_roles\``,
    );
    await queryRunner.query(`DROP TABLE \`sec_organizational_entity_roles\``);
    await queryRunner.query(
      `DROP TABLE \`sec_organizational_entity_role_permissions\``,
    );
    await queryRunner.query(`DROP TABLE \`sec_permissions\``);
    await queryRunner.query(`DROP TABLE \`sec_organizational_entities\``);
    await queryRunner.query(`DROP TABLE \`sec_entity_types\``);
    await queryRunner.query(`DROP TABLE \`sec_roles\``);
    await queryRunner.query(`DROP TABLE \`sec_role_focus\``);
  }
}
