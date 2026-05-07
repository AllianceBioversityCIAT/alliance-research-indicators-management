import { MigrationInterface, QueryRunner } from "typeorm";
import { UserStatusEnum } from "../../domain/entities/user-status/enum/user-status.enum";

export class AddednewUserStatus1778160651143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO user_status (user_status_id, name)
            VALUES (${UserStatusEnum.EXTERNAL_ACCEPTED}, 'External Accepted');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM user_status WHERE user_status_id = ${UserStatusEnum.EXTERNAL_ACCEPTED};
        `);
    }

}
