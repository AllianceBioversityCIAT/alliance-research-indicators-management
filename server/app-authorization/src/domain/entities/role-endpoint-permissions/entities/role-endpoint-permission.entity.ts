import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { Role } from '../../roles/entities/role.entity';
import { EndpointPermission } from '../../endpoint-permissions/entities/endpoint-permission.entity';

@Entity('sec_role_endpoint_permissions')
export class RoleEndpointPermission extends AuditableEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'sec_role_endpoint_permissions_id',
  })
  sec_role_endpoint_permissions_id: number;

  @Column({
    type: 'bigint',
    name: 'role_id',
  })
  role_id: number;

  @Column({
    type: 'bigint',
    name: 'endpoint_permissions_id',
  })
  endpoint_permissions_id: number;

  @ManyToOne(
    () => EndpointPermission,
    (role) => role.role_endpoint_permission_list,
  )
  @JoinColumn({ name: 'endpoint_permissions_id' })
  endpoint_permissions: EndpointPermission;

  @ManyToOne(() => Role, (role) => role.role_endpoint_permission_list)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
