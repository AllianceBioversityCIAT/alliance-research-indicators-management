import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFKElementType1723151823753 implements MigrationInterface {
  name = 'CreateFKElementType1723151823753';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` CHANGE \`element_type_id\` \`element_type_id\` bigint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` ADD CONSTRAINT \`FK_20d86062977103fd10ffff4f0a5\` FOREIGN KEY (\`element_type_id\`) REFERENCES \`sec_element_types\`(\`sec_element_type_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` DROP FOREIGN KEY \`FK_20d86062977103fd10ffff4f0a5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations\` CHANGE \`element_type_id\` \`element_type_id\` bigint NOT NULL`,
    );
  }
}
