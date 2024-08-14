import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../../user_roles/entities/user_role.entity';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';

@Entity('sec_user_role_contracts')
export class UserRoleContract extends AuditableEntity {
  @PrimaryGeneratedColumn({
    name: 'sec_user_role_contract_id',
    type: 'bigint',
  })
  sec_user_role_contract_id!: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  user_id!: number;

  @Column({
    name: 'role_id',
    type: 'bigint',
  })
  role_id!: number;

  @Column({
    name: 'contract_id',
    type: 'varchar',
    length: 35,
  })
  contract_id!: string;

  @ManyToOne(() => UserRole, (user) => user.user_role_contract_list)
  @JoinColumn([
    { name: 'user_id', referencedColumnName: 'user_id' },
    { name: 'role_id', referencedColumnName: 'role_id' },
  ])
  user_role: UserRole;
}
