import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../../shared/global-dto/auditable.entity';
import { EntityType } from '../../entity-types/entities/entity-type.entity';
import { OrganizationalEntityRole } from '../../organizational-entity-roles/entities/organizational-entity-role.entity';

@Entity('sec_organizational_entities')
export class OrganizationalEntity extends AuditableEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'sec_organizational_entity_id',
  })
  sec_organizational_entity_id: number;

  @Column({
    name: 'name',
    type: 'text',
  })
  name: string;

  @Column({
    name: 'parent_id',
    type: 'bigint',
  })
  parent_id: number;

  @Column({
    name: 'entity_type_id',
    type: 'bigint',
  })
  entity_type_id: number;

  @ManyToOne(
    () => OrganizationalEntity,
    (organizationalEntity) => organizationalEntity.children,
  )
  @JoinColumn({ name: 'parent_id' })
  parent: OrganizationalEntity;

  @ManyToOne(() => EntityType, (entityType) => entityType.sec_entity_type_id)
  @JoinColumn({ name: 'entity_type_id' })
  entity_type: EntityType;

  @OneToMany(
    () => OrganizationalEntity,
    (organizationalEntity) => organizationalEntity.parent,
  )
  children: OrganizationalEntity[];

  @OneToMany(
    () => OrganizationalEntityRole,
    (organizationalEntityRole) =>
      organizationalEntityRole.organizational_entity,
  )
  organizational_entity_role_list: OrganizationalEntityRole[];
}
