import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { RefreshToken } from '../../refresh-tokens/entities/refresh-token.entity';
import { UserRole } from '../../user_roles/entities/user_role.entity';

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
  })
  first_name: string;

  @Column({
    type: 'varchar',
    name: 'last_name',
    length: 60,
  })
  last_name: string;

  @Column({
    type: 'varchar',
    name: 'email',
    length: 150,
  })
  email: string;

  @OneToMany(() => RefreshToken, (rt) => rt.user)
  refresh_tokens: RefreshToken[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  user_role_list: UserRole[];
}
