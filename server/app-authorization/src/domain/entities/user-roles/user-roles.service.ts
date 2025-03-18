import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { UserRolesRepository } from './user-roles.repository';
import { BaseServiceSimple } from '../../shared/global-dto/base-service';
import { CurrentUserUtil } from '../../shared/utils/current-user.util';
import { selectManager } from '../../shared/utils/orm.util';

@Injectable()
export class UserRolesService extends BaseServiceSimple<
  UserRole,
  UserRolesRepository
> {
  constructor(
    customRepo: UserRolesRepository,
    currentUserUtil: CurrentUserUtil,
  ) {
    super(UserRole, customRepo, 'user_id', currentUserUtil);
  }

  async _setRoleToUser(
    user_id: number,
    role_id: number,
    manager?: EntityManager,
  ): Promise<UserRole> {
    const entityManager: UserRolesRepository | Repository<UserRole> =
      selectManager<UserRole, UserRolesRepository>(
        manager,
        UserRole,
        this.mainRepo,
      );

    return entityManager
      .save({
        user_id: user_id,
        role_id: role_id,
      })
      .catch((error: Error) => {
        throw new InternalServerErrorException(error);
      });
  }

  async findRolesByUserId(user_id: number) {
    return this.mainRepo.findUserRole(user_id);
  }
}
