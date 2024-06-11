import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { ViewComponent } from '../../view_components/entities/view_component.entity';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { RoleFunctionalPermission } from '../../role_functional_permissions/entities/role_functional_permission.entity';

@Entity('sec_view_configurations')
@Tree('closure-table')
export class ViewConfiguration extends AuditableEntity {
  @PrimaryGeneratedColumn({
    name: 'sec_view_configuration_id',
    type: 'bigint',
  })
  sec_view_configuration_id!: number;

  @Column({
    name: 'component_code',
    type: 'varchar',
    length: 100,
  })
  component_code!: string;

  @Column({
    name: 'title',
    type: 'text',
    nullable: true,
  })
  title?: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    name: 'configurations',
    type: 'json',
    nullable: true,
  })
  configurations?: string;

  @Column({
    name: 'position',
    type: 'int',
  })
  position!: number;

  @Column({
    name: 'hidden',
    type: 'boolean',
    default: false,
  })
  hidden!: boolean;

  @Column({
    name: 'parent_id',
    type: 'bigint',
    nullable: true,
  })
  parent_id?: number;

  @ManyToOne(() => ViewComponent, (vc) => vc.view_configuration_list)
  @JoinColumn({ name: 'component_code' })
  component: ViewComponent;

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent: ViewConfiguration;

  @TreeChildren()
  children: ViewConfiguration[];

  @OneToMany(() => RoleFunctionalPermission, (rfp) => rfp.view_configuration)
  role_functional_permission_list: RoleFunctionalPermission[];
}
