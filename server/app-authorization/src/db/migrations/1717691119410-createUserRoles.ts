import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRoles1717691119410 implements MigrationInterface {
  name = 'CreateUserRoles1717691119410';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`sec_user_roles\` (\`sec_user_role_id\` bigint NOT NULL AUTO_INCREMENT, \`user_id\` bigint NOT NULL, \`role_id\` bigint NOT NULL, PRIMARY KEY (\`sec_user_role_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD CONSTRAINT \`FK_8934d8a0d6f1714bdd15e8343bb\` FOREIGN KEY (\`user_id\`) REFERENCES \`sec_users\`(\`sec_user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` ADD CONSTRAINT \`FK_4bdf3256ec7d5b63ff875a2930c\` FOREIGN KEY (\`role_id\`) REFERENCES \`sec_roles\`(\`sec_role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP FOREIGN KEY \`FK_4bdf3256ec7d5b63ff875a2930c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sec_user_roles\` DROP FOREIGN KEY \`FK_8934d8a0d6f1714bdd15e8343bb\``,
    );
    await queryRunner.query(`DROP TABLE \`sec_user_roles\``);
  }
}
