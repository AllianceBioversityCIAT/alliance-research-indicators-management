import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { RefreshToken } from '../../refresh-tokens/entities/refresh-token.entity';
import { UserRole } from '../../user-roles/entities/user-role.entity';
import { UserStatus } from '../../user-status/entities/user-status.entity';
import { UserRoleContract } from '../../user-role-contracts/entities/user-role-contract.entity';
import { UserRoleResult } from '../../user-role-results/entities/user-role-result.entity';

@Entity('sec_users')
export class User extends AuditableEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'sec_user_id',
  })
  sec_user_id: number;

  @Column({
    type: 'varchar',
    name: 'first_name',
    length: 60,
    nullable: true,
  })
  first_name?: string;

  @Column({
    type: 'varchar',
    name: 'last_name',
    length: 60,
    nullable: true,
  })
  last_name?: string;

  @Column({
    type: 'varchar',
    name: 'email',
    length: 150,
  })
  email: string;

  @Column({
    type: 'bigint',
    name: 'status_id',
    nullable: true,
  })
  status_id: number;

  @Column({
    type: 'timestamp',
    name: 'last_login_at',
    nullable: true,
  })
  last_login_at?: Date;

  @Column({
    name: 'carnet',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  carnet?: string;

  @ManyToOne(() => UserStatus, (userStatus) => userStatus.users)
  @JoinColumn({ name: 'status_id' })
  status?: UserStatus;

  @OneToMany(() => RefreshToken, (rt) => rt.user)
  refresh_tokens: RefreshToken[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  user_role_list: UserRole[];

  @OneToMany(() => UserRoleContract, (userRole) => userRole.user)
  user_role_contracts: UserRoleContract[];

  @OneToMany(() => UserRoleResult, (urr) => urr.user)
  user_role_results: UserRoleResult[];
}
