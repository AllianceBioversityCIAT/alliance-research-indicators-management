import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { UserRoleResult } from '../../user_role_results/entities/user_role_result.entity';
import { UserRoleContract } from '../../user_role_contracts/entities/user_role_contract.entity';

@Entity('sec_user_roles')
export class UserRole extends AuditableEntity {
  @Column({
    type: 'bigint',
    name: 'user_id',
    nullable: false,
    primary: true,
  })
  user_id!: number;

  @Column({
    type: 'bigint',
    name: 'role_id',
    nullable: false,
    primary: true,
  })
  role_id!: number;

  @ManyToOne(() => User, (user) => user.user_role_list)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, (role) => role.user_role_list)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => UserRoleResult, (urr) => urr.user_role)
  user_role_result_list: UserRoleResult[];

  @OneToMany(() => UserRoleContract, (urc) => urc.user_role)
  user_role_contract_list: UserRoleContract[];
}
