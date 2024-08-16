import { Brackets, DataSource, Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRolesRepository extends Repository<UserRole> {
  constructor(private readonly dataSource: DataSource) {
    super(UserRole, dataSource.createEntityManager());
  }

  async findUserRole(
    user_id: number,
    join: Partial<Record<keyof UserRole, boolean>> = {
      user_role_contract_list: false,
      user_role_result_list: false,
    },
  ) {
    const query = this.dataSource
      .getRepository(UserRole)
      .createQueryBuilder('userRole')
      .leftJoinAndSelect('userRole.role', 'role')
      .where('userRole.user_id = :user_id', { user_id })
      .andWhere('userRole.is_active = true');

    if (join.user_role_contract_list) {
      query
        .leftJoinAndSelect(
          'userRole.user_role_contract_list',
          'userRoleContractList',
        )
        .andWhere(
          new Brackets((qb) => {
            qb.where(
              'userRoleContractList.sec_user_role_contract_id IS NOT NULL',
            )
              .andWhere('userRoleContractList.is_active = true')
              .orWhere(
                'userRoleContractList.sec_user_role_contract_id IS NULL',
              );
          }),
        );
    }

    if (join.user_role_result_list) {
      query
        .leftJoinAndSelect(
          'userRole.user_role_result_list',
          'userRoleResultList',
        )
        .andWhere(
          new Brackets((qb) => {
            qb.where('userRoleResultList.sec_user_role_result_id IS NOT NULL')
              .andWhere('userRoleResultList.is_active = true')
              .orWhere('userRoleResultList.sec_user_role_result_id IS NULL');
          }),
        );
    }

    return query.getMany();
  }
}
