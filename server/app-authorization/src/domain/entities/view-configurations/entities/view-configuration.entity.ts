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
import { ViewComponent } from '../../view_components/entities/view_component.entity';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { RoleFunctionalPermission } from '../../role_functional_permissions/entities/role_functional_permission.entity';

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
    name: 'parent_code',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  parent_code?: string;

  @ManyToOne(() => ViewComponent, (vc) => vc.view_configuration_list, {
    eager: true,
  })
  @JoinColumn({ name: 'component_code' })
  component: ViewComponent;

  /*@ManyToOne(() => ViewConfiguration, (vc) => vc.children)
  @JoinColumn({ name: 'parent_code' })*/
  @TreeParent()
  parent: ViewConfiguration;

  /*@OneToMany(() => ViewConfiguration, (vc) => vc.parent, {
    cascade: true,
  })*/
  @TreeChildren({ cascade: true })
  children: ViewConfiguration[];

  @OneToMany(() => RoleFunctionalPermission, (rfp) => rfp.view_configuration)
  role_functional_permission_list: RoleFunctionalPermission[];
}
