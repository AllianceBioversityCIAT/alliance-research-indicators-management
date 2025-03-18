import { DataSource, Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRolesRepository extends Repository<UserRole> {
  constructor(private readonly dataSource: DataSource) {
    super(UserRole, dataSource.createEntityManager());
  }

  async findUserRole(user_id: number) {
    const query = this.dataSource
      .getRepository(UserRole)
      .createQueryBuilder('userRole')
      .leftJoinAndSelect('userRole.role', 'role')
      .where('userRole.user_id = :user_id', { user_id })
      .andWhere('userRole.is_active = true');

    return query.getMany();
  }
}
