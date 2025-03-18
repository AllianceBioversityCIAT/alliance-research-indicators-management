import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { RoleEndpointPermission } from '../../role-endpoint-permissions/entities/role-endpoint-permission.entity';

@Entity('sec_endpoint_permissions')
export class EndpointPermission extends AuditableEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'sec_endpoint_permissions_id',
  })
  sec_endpoint_permissions_id: number;

  @Column({
    name: 'endpoint',
    type: 'text',
  })
  endpoint: string;

  @OneToMany(
    () => RoleEndpointPermission,
    (roleEndpointPermission) => roleEndpointPermission.endpoint_permissions,
  )
  role_endpoint_permission_list: RoleEndpointPermission[];
}
