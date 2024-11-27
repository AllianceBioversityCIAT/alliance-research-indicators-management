import { MigrationInterface, QueryRunner } from 'typeorm';
import { RolesEnum } from '../../domain/shared/enums/roles.enum';
import { RolesFocusEnum } from '../../domain/shared/enums/roles-focus.enum';

export class InsertNewRole1732632680179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`sec_role_focus\` (\`name\`, \`sec_role_focus_id\`) VALUES ('Contract', ${RolesFocusEnum.CONTRACT}), ('Result', ${RolesFocusEnum.RESULT})`,
    );
    await queryRunner.query(
      `INSERT INTO \`sec_roles\` (\`focus_id\`,\`name\`,\`sec_role_id\`) VALUES (${RolesFocusEnum.CONTRACT}, 'Contributor', ${RolesEnum.CONTRACT_CONTRIBUTOR}), (${RolesFocusEnum.RESULT}, 'Contributor', ${RolesEnum.RESULT_CONTRIBUTOR})`,
    );
    await queryRunner.query(`DROP TABLE \`sec_user_role_contracts\``);
    await queryRunner.query(`DROP TABLE \`sec_user_role_results\``);
    await queryRunner.query(`DROP TABLE \`sec_user_roles\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`sec_roles\` WHERE \`sec_role_id\` IN (${RolesEnum.CONTRACT_CONTRIBUTOR}, ${RolesEnum.RESULT_CONTRIBUTOR})`,
    );
    await queryRunner.query(
      `DELETE FROM \`sec_role_focus\` WHERE \`sec_role_focus_id\` IN (${RolesFocusEnum.CONTRACT}, ${RolesFocusEnum.RESULT})`,
    );
  }
}
