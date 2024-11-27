import { MigrationInterface, QueryRunner } from 'typeorm';
import { RolesFocusEnum } from '../../domain/shared/enums/roles-focus.enum';
import { RolesEnum } from '../../domain/shared/enums/roles.enum';

export class InsertApplicationRole1719330598358 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`sec_role_focus\` (\`name\`, \`sec_role_focus_id\`) VALUES ('Application', ${RolesFocusEnum.APPLICATION})`,
    );
    await queryRunner.query(
      `INSERT INTO \`sec_roles\` (\`focus_id\`,\`name\`,\`sec_role_id\`) VALUES (${RolesFocusEnum.APPLICATION}, 'General Admin',${RolesEnum.GENERAL_ADMIN}), (${RolesFocusEnum.APPLICATION}, 'IT Support', ${RolesEnum.IT_SUPPORT}), (${RolesFocusEnum.APPLICATION}, 'Contributor', ${RolesEnum.CONTRIBUTOR}), (${RolesFocusEnum.APPLICATION}, 'Global', ${RolesEnum.GLOBAL})`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`sec_roles\` WHERE sec_role_id in (1,2,3,4)`,
    );
    await queryRunner.query(
      `DELETE FROM \`sec_role_focus\` WHERE sec_role_focus_id = 1`,
    );
  }
}
