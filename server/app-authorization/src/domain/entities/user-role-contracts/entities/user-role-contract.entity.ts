import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';

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

  @ManyToOne(() => User, (user) => user.user_role_contracts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, (role) => role.user_role_contracts)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
