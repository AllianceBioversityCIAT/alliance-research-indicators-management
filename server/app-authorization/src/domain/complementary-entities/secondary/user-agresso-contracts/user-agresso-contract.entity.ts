import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { AgressoContract } from '../agresso-contract/agresso-contract.entity';

@Entity('user_agresso_contract')
@Index('user_agresso_contract_pkey', ['agreement_id', 'user_id'])
export class UserAgressoContract extends AuditableEntity {
  @PrimaryGeneratedColumn({
    name: 'user_agresso_contract_id',
    type: 'bigint',
  })
  user_agresso_contract_id: number;

  @Column('varchar', {
    length: 36,
    name: 'agreement_id',
    nullable: false,
  })
  agreement_id!: string;

  @Column('bigint', {
    name: 'user_id',
    nullable: false,
  })
  user_id!: number;

  @ManyToOne(
    () => AgressoContract,
    (agressoContract) => agressoContract.userAgressoContracts,
  )
  @JoinColumn({
    name: 'agreement_id',
  })
  agressoContract: AgressoContract;
}
