import { Routes, RouteTree } from '@nestjs/core';
import { RolesModule } from '../entities/roles/roles.module';
import { UsersModule } from '../entities/users/users.module';
import { AuthorizationModule } from '../entities/authorization.module';
import { OrganizationalEntitiesModule } from '../entities/organizational-entities/organizational-entities.module';
import { EntityTypesModule } from '../entities/entity-types/entity-types.module';
import { OrganizationalEntityRolesModule } from '../entities/organizational-entity-roles/organizational-entity-roles.module';
import { OrganizationalEntityRolePermissionsModule } from '../entities/organizational-entity-role-permissions/organizational-entity-role-permissions.module';
import { PermissionsModule } from '../entities/permissions/permissions.module';
import { UserOrganizationalEntityRolesModule } from '../entities/user-organizational-entity-roles/user-organizational-entity-roles.module';
import { RoleFocusModule } from '../entities/role-focus/role-focus.module';

const organizational: Routes = [
  { path: 'entities', module: OrganizationalEntitiesModule },
  { path: 'entity-roles', module: OrganizationalEntityRolesModule },
  {
    path: 'entity-role-permissions',
    module: OrganizationalEntityRolePermissionsModule,
  },
  {
    path: 'user-entity-roles',
    module: UserOrganizationalEntityRolesModule,
  },
];

const role: Routes = [
  { path: '/', module: RolesModule },
  { path: 'focus', module: RoleFocusModule },
];

const children: Routes = [
  { path: 'user', module: UsersModule },
  { path: 'entity-types', module: EntityTypesModule },
  { path: 'organizational', children: organizational },
  { path: 'permissions', module: PermissionsModule },
  { path: 'role', children: role },
];

export const routes: RouteTree = {
  path: 'authorization',
  module: AuthorizationModule,
  children: children,
};
