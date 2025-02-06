import { MigrationInterface, QueryRunner } from 'typeorm';
import { RolesFocusEnum } from '../../domain/shared/enums/roles-focus.enum';
import { RolesEnum } from '../../domain/shared/enums/roles.enum';

export class CreateDeveloperRole1738851407067 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`sec_roles\` (\`focus_id\`,\`name\`,\`sec_role_id\`) VALUES (${RolesFocusEnum.APPLICATION}, 'Developer', ${RolesEnum.DEVELOPER})`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`sec_roles\` WHERE \`sec_role_id\` IN (${RolesEnum.DEVELOPER})`,
    );
  }
}
