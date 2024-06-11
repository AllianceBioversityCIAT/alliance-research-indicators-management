import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserRole } from './entities/user_role.entity';

@Injectable()
export class UserRolesService {
  constructor() {}

  async _setRoleToUser(
    manager: EntityManager,
    user_id: number,
    role_id: number,
  ): Promise<UserRole> {
    return manager
      .getRepository(UserRole)
      .save({
        user_id: user_id,
        role_id: role_id,
      })
      .catch((error: Error) => {
        throw new InternalServerErrorException(error);
      });
  }
}
