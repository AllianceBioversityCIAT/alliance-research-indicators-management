import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { OrganizationalEntity } from '../../organizational-entities/entities/organizational-entity.entity';

@Entity('sec_user_roles')
export class UserRole extends AuditableEntity {
  @Column({
    type: 'bigint',
    name: 'user_id',
    nullable: false,
    primary: true,
  })
  user_id!: number;

  @Column({
    type: 'bigint',
    name: 'role_id',
    nullable: false,
    primary: true,
  })
  role_id!: number;

  @Column({
    type: 'bigint',
    name: 'organizational_entity_id',
    nullable: true,
  })
  organizational_entity_id?: number;

  @ManyToOne(() => User, (user) => user.user_role_list)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, (role) => role.user_role_list)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(
    () => OrganizationalEntity,
    (organizationalEntity) => organizationalEntity.user_role_list,
  )
  @JoinColumn({ name: 'organizational_entity_id' })
  organizational_entity: OrganizationalEntity;
}
