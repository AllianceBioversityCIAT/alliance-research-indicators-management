import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { UserRoleResult } from './entities/user-role-result.entity';

@Injectable()
export class UserRoleResultsService {
  constructor(private readonly dataSource: DataSource) {}

  async _setResultToUserRole(
    user_id: number,
    role_id: number,
    result_id: number,
    manager?: EntityManager,
  ) {
    const dataManager = manager || this.dataSource;
    let newUserRoleResult = await dataManager
      .getRepository(UserRoleResult)
      .findOne({
        where: {
          role_id: role_id,
          user_id: user_id,
          result_id: result_id,
        },
      });

    if (!newUserRoleResult) {
      newUserRoleResult = await dataManager.getRepository(UserRoleResult).save({
        user_id: user_id,
        role_id: role_id,
        result_id: result_id,
      });
    } else if (!newUserRoleResult.is_active) {
      newUserRoleResult = await dataManager
        .getRepository(UserRoleResult)
        .update(
          {
            user_id: user_id,
            role_id: role_id,
            result_id: result_id,
          },
          {
            is_active: true,
          },
        )
        .then(() => ({ ...newUserRoleResult, is_active: true }));
    }

    return newUserRoleResult;
  }
}
