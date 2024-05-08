import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { UserOrganizationalEntityRole } from '../../user-organizational-entity-roles/entities/user-organizational-entity-role.entity';
import { RefreshToken } from '../../refresh-tokens/entities/refresh-token.entity';

@Entity('sec_users')
export class User extends AuditableEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'sec_user_id',
  })
  sec_user_id: number;

  @Column({
    type: 'varchar',
    name: 'first_name',
    length: 60,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    name: 'last_name',
    length: 60,
  })
  last_name: string;

  @Column({
    type: 'varchar',
    name: 'email',
    length: 150,
  })
  email: string;

  @OneToMany(
    () => UserOrganizationalEntityRole,
    (userOrganizationalEntityRole) => userOrganizationalEntityRole.user,
  )
  user_organizational_entity_roles: UserOrganizationalEntityRole[];

  @OneToMany(() => RefreshToken, (rt) => rt.user)
  refresh_tokens: RefreshToken[];
}
