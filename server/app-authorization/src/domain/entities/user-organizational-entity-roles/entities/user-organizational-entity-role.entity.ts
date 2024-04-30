import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { User } from '../../users/entities/user.entity';
import { OrganizationalEntityRole } from '../../organizational-entity-roles/entities/organizational-entity-role.entity';

@Entity('sec_user_organizational_entity_roles')
export class UserOrganizationalEntityRole extends AuditableEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'sec_user_organizational_entity_role_id',
  })
  sec_user_organizational_entity_role_id: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  user_id: number;

  @Column({
    name: 'organizational_entity_role_id',
    type: 'bigint',
  })
  organizational_entity_role_id: number;

  @ManyToOne(() => User, (user) => user.user_organizational_entity_roles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => OrganizationalEntityRole,
    (organizationalEntityRole) =>
      organizationalEntityRole.user_organizational_entity_role_list,
  )
  @JoinColumn({ name: 'organizational_entity_role_id' })
  organizational_entity_role: OrganizationalEntityRole;
}
