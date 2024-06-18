import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { Role } from '../../roles/entities/role.entity';
import { ViewConfiguration } from '../../view-configurations/entities/view-configuration.entity';

@Entity('sec_role_functional_permissions')
export class RoleFunctionalPermission extends AuditableEntity {
  @PrimaryGeneratedColumn({
    name: 'sec_role_functional_permission_id',
    type: 'bigint',
  })
  sec_role_functional_permission_id!: number;

  @Column({
    name: 'role_id',
    type: 'bigint',
  })
  role_id!: number;

  @Column({
    name: 'view_configuration_code',
    type: 'varchar',
    length: 36,
  })
  view_configuration_code!: string;

  @Column({
    name: 'write',
    type: 'boolean',
    default: false,
  })
  write!: boolean;

  @ManyToOne(() => Role, (role) => role.role_functional_permission_list)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(
    () => ViewConfiguration,
    (viewConfiguration) => viewConfiguration.role_functional_permission_list,
  )
  @JoinColumn({ name: 'view_configuration_code' })
  view_configuration: ViewConfiguration;
}
