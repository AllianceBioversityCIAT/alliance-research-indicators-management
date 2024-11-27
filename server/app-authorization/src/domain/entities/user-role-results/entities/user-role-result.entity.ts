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

@Entity('sec_user_role_results')
export class UserRoleResult extends AuditableEntity {
  @PrimaryGeneratedColumn({
    name: 'sec_user_role_result_id',
    type: 'bigint',
  })
  sec_user_role_result_id!: number;

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
    name: 'result_id',
    type: 'bigint',
    nullable: true,
  })
  result_id?: number;

  @ManyToOne(() => User, (user) => user.user_role_results)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, (role) => role.user_role_results)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
