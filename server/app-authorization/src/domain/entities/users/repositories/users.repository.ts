import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly entityManager: EntityManager) {
    super(User, entityManager);
  }

  async findUserAndRoles(userId: number) {
    const query = `select 
          su.sec_user_id, 
          su.first_name, 
          su.last_name, 
          su.email,
          JSON_ARRAYAGG(sur.role_id) as roles
      from sec_users su
      left join sec_user_roles sur on sur.user_id = su.sec_user_id 
                                  and sur.is_active = true
      where su.sec_user_id = ?
          and su.is_active = true
      group by su.sec_user_id
      limit 1;`;
    return this.entityManager
      .query(query, [userId])
      .then((res) => res?.[0] ?? null);
  }
}
