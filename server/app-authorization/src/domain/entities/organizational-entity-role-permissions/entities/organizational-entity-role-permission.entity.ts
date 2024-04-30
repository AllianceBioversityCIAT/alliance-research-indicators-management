import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { OrganizationalEntityRole } from '../../organizational-entity-roles/entities/organizational-entity-role.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('sec_organizational_entity_role_permissions')
export class OrganizationalEntityRolePermission extends AuditableEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'sec_organizational_entity_role_permission_id',
  })
  sec_organizational_entity_role_permission_id: number;

  @Column({
    name: 'permission_id',
    type: 'bigint',
  })
  permission_id: number;

  @Column({
    name: 'organizational_entity_role_id',
    type: 'bigint',
  })
  organizational_entity_role_id: number;

  @ManyToOne(
    () => OrganizationalEntityRole,
    (organizationalEntityRole) =>
      organizationalEntityRole.organizational_entity_role_permission_list,
  )
  @JoinColumn({ name: 'organizational_entity_role_id' })
  organizational_entity_role: OrganizationalEntityRole;

  @ManyToOne(() => Permission, (permission) => permission.sec_permission_id)
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;
}
