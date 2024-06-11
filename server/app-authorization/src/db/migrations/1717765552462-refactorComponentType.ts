import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorComponentType1717765552462 implements MigrationInterface {
  name = 'RefactorComponentType1717765552462';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_component_types\` CHANGE \`component_type_code\` \`name\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD \`organizational_entity_id\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD CONSTRAINT \`FK_ecfbb29c70acc3e54e5d4ee408b\` FOREIGN KEY (\`organizational_entity_id\`) REFERENCES \`sec_organizational_entities\`(\`sec_organizational_entity_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP FOREIGN KEY \`FK_ecfbb29c70acc3e54e5d4ee408b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP COLUMN \`organizational_entity_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_component_types\` CHANGE \`name\` \`component_type_code\` text NOT NULL`,
    );
  }
}
