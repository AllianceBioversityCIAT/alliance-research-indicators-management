import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { User } from '../../users/entities/user.entity';

@Entity('user_status')
export class UserStatus extends AuditableEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_status_id',
  })
  user_status_id!: number;

  @Column({
    name: 'name',
    type: 'text',
    nullable: false,
  })
  name!: string;

  @OneToMany(() => User, (user) => user.status)
  users!: User[];
}
