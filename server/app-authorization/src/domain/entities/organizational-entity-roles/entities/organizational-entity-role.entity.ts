import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { OrganizationalEntity } from '../../organizational-entities/entities/organizational-entity.entity';
import { Role } from '../../roles/entities/role.entity';
import { OrganizationalEntityRolePermission } from '../../organizational-entity-role-permissions/entities/organizational-entity-role-permission.entity';
import { UserOrganizationalEntityRole } from '../../user-organizational-entity-roles/entities/user-organizational-entity-role.entity';

@Entity('sec_organizational_entity_roles')
export class OrganizationalEntityRole extends AuditableEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'sec_organizational_entity_role_id',
  })
  sec_organizational_entity_role_id: number;

  @Column({
    name: 'role_id',
    type: 'bigint',
  })
  role_id: number;

  @Column({
    name: 'organizational_entity_id',
    type: 'bigint',
  })
  organizational_entity_id: number;

  @Column({
    name: 'is_visible',
    type: 'boolean',
    default: true,
  })
  is_visible: boolean;

  @ManyToOne(
    () => OrganizationalEntity,
    (organizationalEntity) => organizationalEntity.children,
  )
  @JoinColumn({ name: 'organizational_entity_id' })
  organizational_entity: OrganizationalEntity;

  @ManyToOne(() => Role, (role) => role.sec_role_id)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(
    () => OrganizationalEntityRolePermission,
    (organizationalEntityRolePermission) =>
      organizationalEntityRolePermission.organizational_entity_role,
  )
  organizational_entity_role_permission_list: OrganizationalEntityRolePermission[];

  @OneToMany(
    () => UserOrganizationalEntityRole,
    (userOrganizationalEntityRole) =>
      userOrganizationalEntityRole.organizational_entity_role,
  )
  user_organizational_entity_role_list: UserOrganizationalEntityRole[];
}
