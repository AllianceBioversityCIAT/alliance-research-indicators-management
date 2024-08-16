import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../../user-roles/entities/user-role.entity';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';

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

  @ManyToOne(() => UserRole, (user) => user.user_role_result_list)
  @JoinColumn([
    { name: 'user_id', referencedColumnName: 'user_id' },
    { name: 'role_id', referencedColumnName: 'role_id' },
  ])
  user_role: UserRole;
}
