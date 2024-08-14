import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Brackets, DataSource, EntityManager } from 'typeorm';
import { UserRole } from './entities/user_role.entity';
import { ResponseUtils } from '../../shared/utils/response.utils';
import { CreateUserRoleDto } from './dto/create-user_role.dto';

@Injectable()
export class UserRolesService {
  constructor(private readonly dataSource: DataSource) {}

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
    return this._setRoleToUser(userRole.user_id, userRole.role_id).then(
      (role) =>
        ResponseUtils.format({
          description: 'Role saved successfully',
          status: HttpStatus.CREATED,
          data: role,
        }),
    );
  }

  async findRolesByUserId(user_id: number) {
    return this.dataSource
      .getRepository(UserRole)
      .createQueryBuilder('userRole')
      .leftJoinAndSelect('userRole.role', 'role')
      .leftJoinAndSelect(
        'userRole.user_role_contract_list',
        'userRoleContractList',
      )
      .leftJoinAndSelect('userRole.user_role_result_list', 'userRoleResultList')
      .where('userRole.user_id = :user_id', { user_id })
      .andWhere('userRole.is_active = true')
      .andWhere(
        new Brackets((qb) => {
          qb.where('userRoleContractList.sec_user_role_contract_id IS NOT NULL')
            .andWhere('userRoleContractList.is_active = true')
            .orWhere('userRoleContractList.sec_user_role_contract_id IS NULL');
        }),
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('userRoleResultList.sec_user_role_result_id IS NOT NULL')
            .andWhere('userRoleResultList.is_active = true')
            .orWhere('userRoleResultList.sec_user_role_result_id IS NULL');
        }),
      )
      .getMany()
      .then((roles) =>
        ResponseUtils.format({
          description: 'Roles found successfully',
          status: HttpStatus.OK,
          data: roles,
        }),
      );
    return this.dataSource
      .getRepository(UserRole)
      .find({
        where: {
          user_id: user_id,
          is_active: true,
        },
        relations: {
          role: true,
        },
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
