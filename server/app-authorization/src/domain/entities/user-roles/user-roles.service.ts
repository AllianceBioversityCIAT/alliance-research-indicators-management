import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { ResponseUtils } from '../../shared/utils/response.utils';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRoleContractsService } from '../user-role-contracts/user-role-contracts.service';
import { UserRoleResultsService } from '../user-role-results/user-role-results.service';
import { UserRolesRepository } from './user-roles.repository';

@Injectable()
export class UserRolesService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userRoleContractsService: UserRoleContractsService,
    private readonly userRoleResultsService: UserRoleResultsService,
    private readonly userRolesRepository: UserRolesRepository,
  ) {}

  async _setRoleToUser(
    user_id: number,
    role_id: number,
    manager?: EntityManager,
  ): Promise<UserRole> {
    return (manager || this.dataSource)
      .getRepository(UserRole)
      .save({
        user_id: user_id,
        role_id: role_id,
      })
      .catch((error: Error) => {
        throw new InternalServerErrorException(error);
      });
  }

  async saveUserRole(userRole: CreateUserRoleDto) {
    return this.dataSource.transaction(async (manager) => {
      let existUserRole = await manager.getRepository(UserRole).findOne({
        where: {
          user_id: userRole.user_id,
          role_id: userRole.role_id,
        },
      });

      if (userRole?.contract_id && userRole?.result_id)
        throw new InternalServerErrorException(
          'You can not set contract and result at the same time',
        );

      if (!existUserRole) {
        existUserRole = await this._setRoleToUser(
          userRole.user_id,
          userRole.role_id,
        );
      } else if (existUserRole.is_active === false) {
        await manager.getRepository(UserRole).update(
          {
            user_id: existUserRole.user_id,
            role_id: existUserRole.role_id,
          },
          {
            is_active: true,
          },
        );
      }

      if (userRole?.contract_id) {
        await this.userRoleContractsService._setContractToUserRole(
          existUserRole.user_id,
          existUserRole.role_id,
          userRole.contract_id,
          manager,
        );
      }

      if (userRole?.result_id) {
        await this.userRoleResultsService._setResultToUserRole(
          existUserRole.user_id,
          existUserRole.role_id,
          userRole.result_id,
          manager,
        );
      }
    });
  }

  async findRolesByUserId(user_id: number) {
    return this.userRolesRepository
      .findUserRole(user_id, {
        user_role_contract_list: true,
        user_role_result_list: true,
      })
      .then((roles) =>
        ResponseUtils.format({
          description: 'Roles found successfully',
          status: HttpStatus.OK,
          data: roles,
        }),
      );
  }
}
