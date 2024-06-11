import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ComponentType } from '../../component-types/entities/component-type.entity';
import { ViewConfiguration } from '../../view-configurations/entities/view-configuration.entity';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';

@Entity('sec_view_components')
export class ViewComponent extends AuditableEntity {
  @Column({
    primary: true,
    name: 'sec_view_component_id',
    type: 'varchar',
    length: 100,
  })
  sec_view_component_id!: number;

  @Column({
    name: 'component_type_id',
    type: 'bigint',
  })
  component_type_id!: number;

  @ManyToOne(
    () => ComponentType,
    (componentType) => componentType.sec_component_type_id,
  )
  @JoinColumn({ name: 'component_type_id' })
  component_type: ComponentType;

  @OneToMany(() => ViewConfiguration, (vc) => vc.component_code)
  view_configuration_list: ViewConfiguration[];
}
