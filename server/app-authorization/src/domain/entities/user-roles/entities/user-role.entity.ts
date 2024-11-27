import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
@Entity('sec_user_roles')
export class UserRole extends AuditableEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'sec_user_role_id',
  })
  sec_user_role_id!: number;

  @Column({
    type: 'bigint',
    name: 'user_id',
    nullable: false,
  })
  user_id!: number;

  @Column({
    type: 'bigint',
    name: 'role_id',
    nullable: false,
  })
  role_id!: number;

  @ManyToOne(() => User, (user) => user.user_role_list)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, (role) => role.user_role_list)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
