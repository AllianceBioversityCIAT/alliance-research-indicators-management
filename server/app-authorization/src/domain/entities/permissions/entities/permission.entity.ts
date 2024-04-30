import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';

@Entity('sec_permissions')
export class Permission extends AuditableEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'sec_permission_id',
  })
  sec_permission_id: number;

  @Column({
    name: 'name',
    type: 'text',
  })
  name: string;
}
