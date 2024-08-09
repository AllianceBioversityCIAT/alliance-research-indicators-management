import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableControlListEntity } from '../../../shared/global-dto/auditable-control-list.entity';

@Entity('sec_element_types')
export class ElementType extends AuditableControlListEntity {
  @PrimaryGeneratedColumn({
    name: 'sec_element_type_id',
    type: 'bigint',
  })
  sec_element_type_id!: number;

  @Column({
    name: 'name',
    type: 'text',
  })
  name!: string;

  @Column({
    name: 'can_create',
    type: 'boolean',
    default: false,
  })
  can_create!: boolean;

  @Column({
    name: 'can_read',
    type: 'boolean',
    default: false,
  })
  can_read!: boolean;

  @Column({
    name: 'can_update',
    type: 'boolean',
    default: false,
  })
  can_update!: boolean;

  @Column({
    name: 'can_delete',
    type: 'boolean',
    default: false,
  })
  can_delete!: boolean;

  @Column({
    name: 'can_execute',
    type: 'boolean',
    default: false,
  })
  can_execute!: boolean;
}
