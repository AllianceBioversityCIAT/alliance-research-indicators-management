import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertApplicationRole1719330598358 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`sec_role_focus\` (\`name\`, \`sec_role_focus_id\`) VALUES ('Application', 1)`,
    );
    await queryRunner.query(
      `INSERT INTO \`sec_roles\` (\`focus_id\`,\`name\`,\`sec_role_id\`) VALUES (1,'Admin',1),(1,'Contributor',2),(1,'Guest',3)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`sec_roles\` WHERE sec_role_id in (1,2,3)`,
    );
    await queryRunner.query(
      `DELETE FROM \`sec_role_focus\` WHERE sec_role_focus_id = 1`,
    );
  }
}
