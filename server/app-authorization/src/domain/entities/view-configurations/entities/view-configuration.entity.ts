import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { RoleFunctionalPermission } from '../../role-functional-permissions/entities/role-functional-permission.entity';
import { ElementType } from '../../element-types/entities/element-type.entity';

@Entity('sec_view_configurations')
@Tree('closure-table')
export class ViewConfiguration extends AuditableEntity {
  @Column({
    name: 'sec_view_configuration_code',
    type: 'varchar',
    length: 36,
    primary: true,
  })
  sec_view_configuration_code!: string;

  @Column({
    name: 'client_element_code',
    type: 'varchar',
    length: 100,
  })
  client_element_code!: string;

  @Column({
    name: 'element_type_id',
    type: 'bigint',
    nullable: true,
  })
  element_type_id?: number;

  @ManyToOne(() => ElementType, (et) => et.sec_element_type_id)
  @JoinColumn({ name: 'element_type_id' })
  element_type: ElementType;

  @TreeParent()
  parent: ViewConfiguration;

  @TreeChildren({ cascade: true })
  children: ViewConfiguration[];

  @OneToMany(() => RoleFunctionalPermission, (rfp) => rfp.view_configuration)
  role_functional_permission_list: RoleFunctionalPermission[];
}
