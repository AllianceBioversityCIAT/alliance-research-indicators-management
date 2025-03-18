import { Column } from 'typeorm';
import { AuditableEntity } from './auditable.entity';

export class AuditableControlListEntity extends AuditableEntity {
  @Column({
    type: 'text',
    name: 'justification_update',
    nullable: true,
  })
  justification_update!: string;
}
