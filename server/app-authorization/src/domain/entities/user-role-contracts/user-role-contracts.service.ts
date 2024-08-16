import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { UserRoleContract } from './entities/user-role-contract.entity';

@Injectable()
export class UserRoleContractsService {
  constructor(private readonly dataSource: DataSource) {}

  async _setContractToUserRole(
    user_id: number,
    role_id: number,
    contract_id: string,
    manager?: EntityManager,
  ): Promise<UserRoleContract> {
    const dataManager = manager || this.dataSource;
    let newUserRoleContract = await dataManager
      .getRepository(UserRoleContract)
      .findOne({
        where: {
          role_id: role_id,
          user_id: user_id,
          contract_id: contract_id,
        },
      });

    if (!newUserRoleContract) {
      newUserRoleContract = await dataManager
        .getRepository(UserRoleContract)
        .save({
          user_id: user_id,
          role_id: role_id,
          contract_id: contract_id,
        });
    } else if (newUserRoleContract.is_active === false) {
      newUserRoleContract = await dataManager
        .getRepository(UserRoleContract)
        .update(
          {
            user_id: user_id,
            role_id: role_id,
            contract_id: contract_id,
          },
          {
            is_active: true,
          },
        )
        .then(() => ({ ...newUserRoleContract, is_active: true }));
    }

    return newUserRoleContract;
  }
}
