import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { User } from '../../users/entities/user.entity';

@Entity('sec_refresh_tokens')
export class RefreshToken extends AuditableEntity {
  @Column({
    type: 'varchar',
    length: 36,
    primary: true,
    nullable: false,
    name: 'refresh_token_code',
  })
  refresh_token_code: string;

  @Column({
    type: 'bigint',
    name: 'user_id',
    nullable: false,
  })
  user_id: number;

  @Column({
    type: 'timestamp',
    name: 'expires_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  expires_at: Date;

  @ManyToOne(() => User, (user) => user.refresh_tokens)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
