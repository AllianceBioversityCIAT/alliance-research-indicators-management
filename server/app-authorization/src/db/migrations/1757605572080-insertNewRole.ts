import { MigrationInterface, QueryRunner } from 'typeorm';
import { RolesFocusEnum } from '../../domain/shared/enums/roles-focus.enum';
import { RolesEnum } from '../../domain/shared/enums/roles.enum';

export class InsertNewRole1757605572080 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`sec_roles\` (\`focus_id\`,\`name\`,\`sec_role_id\`) VALUES (${RolesFocusEnum.APPLICATION}, 'General Admin',${RolesEnum.GENERAL_ADMIN}), (${RolesFocusEnum.APPLICATION}, 'Tester',${RolesEnum.TESTER})`,
    );
    await queryRunner.query(
      `UPDATE \`sec_roles\` SET \`name\` = 'Super Admin' WHERE \`sec_role_id\` = ${RolesEnum.SUP_ADMIN}`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`sec_roles\` WHERE \`sec_role_id\` = ${RolesEnum.GENERAL_ADMIN}`,
    );
    await queryRunner.query(
      `UPDATE \`sec_roles\` SET \`name\` = 'General Admin' WHERE \`sec_role_id\` = ${RolesEnum.SUP_ADMIN}`,
    );
  }
}
