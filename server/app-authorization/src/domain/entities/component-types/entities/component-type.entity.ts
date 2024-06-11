import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableControlListEntity } from '../../../shared/global-dto/auditable-control-list.entity';

@Entity('sec_component_types')
export class ComponentType extends AuditableControlListEntity {
  @PrimaryGeneratedColumn({
    name: 'sec_component_type_id',
    type: 'bigint',
  })
  sec_component_type_id!: number;

  @Column({
    name: 'name',
    type: 'text',
  })
  name!: string;
}
