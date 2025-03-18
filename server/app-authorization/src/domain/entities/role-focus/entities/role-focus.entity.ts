import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableControlListEntity } from '../../../shared/global-dto/auditable-control-list.entity';

@Entity('sec_role_focus')
export class RoleFocus extends AuditableControlListEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'sec_role_focus_id',
  })
  sec_role_focus_id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    length: 100,
  })
  name: string;
}
