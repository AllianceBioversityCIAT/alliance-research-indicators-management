import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableControlListEntity } from '../../../shared/global-dto/auditable-control-list.entity';

@Entity('sec_entity_types')
export class EntityType extends AuditableControlListEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'sec_entity_type_id',
  })
  sec_entity_type_id: number;

  @Column({
    name: 'name',
    type: 'text',
  })
  name: string;
}
