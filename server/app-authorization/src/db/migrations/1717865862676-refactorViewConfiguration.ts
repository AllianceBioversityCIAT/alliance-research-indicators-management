import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorViewConfiguration1717865862676
  implements MigrationInterface
{
  name = 'RefactorViewConfiguration1717865862676';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`sec_view_configurations_closure\` (\`sec_view_configuration_id_ancestor\` bigint NOT NULL, \`sec_view_configuration_id_descendant\` bigint NOT NULL, INDEX \`IDX_fe4deb3473dd64411e80eeacc6\` (\`sec_view_configuration_id_ancestor\`), INDEX \`IDX_563988527bc3c0562e32241ab0\` (\`sec_view_configuration_id_descendant\`), PRIMARY KEY (\`sec_view_configuration_id_ancestor\`, \`sec_view_configuration_id_descendant\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations_closure\` ADD CONSTRAINT \`FK_fe4deb3473dd64411e80eeacc6c\` FOREIGN KEY (\`sec_view_configuration_id_ancestor\`) REFERENCES \`sec_view_configurations\`(\`sec_view_configuration_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations_closure\` ADD CONSTRAINT \`FK_563988527bc3c0562e32241ab0f\` FOREIGN KEY (\`sec_view_configuration_id_descendant\`) REFERENCES \`sec_view_configurations\`(\`sec_view_configuration_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations_closure\` DROP FOREIGN KEY \`FK_563988527bc3c0562e32241ab0f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_view_configurations_closure\` DROP FOREIGN KEY \`FK_fe4deb3473dd64411e80eeacc6c\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_563988527bc3c0562e32241ab0\` ON \`sec_view_configurations_closure\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fe4deb3473dd64411e80eeacc6\` ON \`sec_view_configurations_closure\``,
    );
    await queryRunner.query(`DROP TABLE \`sec_view_configurations_closure\``);
  }
}
