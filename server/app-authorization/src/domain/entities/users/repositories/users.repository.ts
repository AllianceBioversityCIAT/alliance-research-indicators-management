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

  async findAppSecret(appSecretUuid: string): Promise<UserWithHosts | null> {
    const query = `SELECT 
                      t.app_secret_key,
                      t.app_secret_id,
                      t.responsible_user_id,
                      su.sec_user_id, 
                      su.first_name, 
                      su.last_name, 
                      su.email,
                      su.roles,
                      if(count(ashl.host) = 0, null,JSON_ARRAYAGG(ashl.host)) as hosts
                  FROM app_secrets t 
                  LEFT JOIN app_secret_host_list ashl ON ashl.app_secret_id = t.app_secret_id 
                                    AND ashl.is_active = TRUE
                  LEFT JOIN (select 
                            su.sec_user_id, 
                            su.first_name, 
                            su.last_name, 
                            su.email,
                            JSON_ARRAYAGG(sur.role_id) as roles
                        from sec_users su
                        left join sec_user_roles sur on sur.user_id = su.sec_user_id 
                                                    and sur.is_active = true
                        where su.is_active = true
                        group by su.sec_user_id) su ON su.sec_user_id = t.responsible_user_id 
                  WHERE t.is_active = TRUE
                    	  AND t.app_secret_uuid = ?
                  GROUP BY t.app_secret_id`;
    return this.query(query, [appSecretUuid]).then((res) => res?.[0] ?? null);
  }
}

export type UserWithHosts = {
  app_secret_key: string;
  app_secret_id: number;
  responsible_user_id: number;
  sec_user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  roles: number[];
  hosts: string[] | null;
};
