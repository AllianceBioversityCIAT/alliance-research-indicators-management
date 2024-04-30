import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableControlListEntity } from '../../../shared/global-dto/auditable-control-list.entity';
import { RoleFocus } from '../../role-focus/entities/role-focus.entity';

@Entity('sec_roles')
export class Role extends AuditableControlListEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'sec_role_id',
  })
  sec_role_id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    length: 60,
  })
  name: string;

  @Column({
    name: 'focus_id',
    type: 'bigint',
  })
  focus_id: number;

  @ManyToOne(() => RoleFocus, (roleFocus) => roleFocus.sec_role_focus_id)
  @JoinColumn({ name: 'focus_id' })
  focus: RoleFocus;
}
