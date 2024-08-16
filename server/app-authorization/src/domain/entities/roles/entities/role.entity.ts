import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableControlListEntity } from '../../../shared/global-dto/auditable-control-list.entity';
import { RoleFocus } from '../../role-focus/entities/role-focus.entity';
import { RoleFunctionalPermission } from '../../role-functional-permissions/entities/role-functional-permission.entity';
import { UserRole } from '../../user-roles/entities/user-role.entity';
import { RoleEndpointPermission } from '../../role-endpoint-permissions/entities/role-endpoint-permission.entity';

@Entity('sec_roles')
export class Role extends AuditableControlListEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'sec_role_id',
  })
  sec_role_id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    length: 60,
  })
  name: string;

  @Column({
    name: 'focus_id',
    type: 'bigint',
  })
  focus_id: number;

  @ManyToOne(() => RoleFocus, (roleFocus) => roleFocus.sec_role_focus_id)
  @JoinColumn({ name: 'focus_id' })
  focus: RoleFocus;

  @OneToMany(
    () => RoleFunctionalPermission,
    (roleFunctionalPermission) => roleFunctionalPermission.role,
  )
  role_functional_permission_list: RoleFunctionalPermission[];

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  user_role_list: UserRole[];

  @OneToMany(
    () => RoleEndpointPermission,
    (roleEndpointPermission) => roleEndpointPermission.role,
  )
  role_endpoint_permission_list: RoleEndpointPermission[];
}
