import { Routes, RouteTree } from '@nestjs/core';
import { RolesModule } from '../entities/roles/roles.module';
import { UsersModule } from '../entities/users/users.module';
import { AuthorizationModule } from '../entities/authorization.module';
import { OrganizationalEntitiesModule } from '../entities/organizational-entities/organizational-entities.module';
import { EntityTypesModule } from '../entities/entity-types/entity-types.module';
import { PermissionsModule } from '../entities/permissions/permissions.module';
import { RoleFocusModule } from '../entities/role-focus/role-focus.module';
import { UserRolesModule } from '../entities/user_roles/user_roles.module';
import { RoleFunctionalPermissionsModule } from '../entities/role_functional_permissions/role_functional_permissions.module';
import { ComponentTypesModule } from '../entities/component-types/component-types.module';
import { ViewComponentsModule } from '../entities/view_components/view_components.module';
import { ViewConfigurationsModule } from '../entities/view-configurations/view-configurations.module';

const organizational: Routes = [
  { path: 'entities', module: OrganizationalEntitiesModule },
];

const role: Routes = [
  { path: 'focus', module: RoleFocusModule },
  { path: 'functional-permission', module: RoleFunctionalPermissionsModule },
];

const users: Routes = [{ path: 'roles', module: UserRolesModule }];

const view: Routes = [
  { path: 'configurations', module: ViewConfigurationsModule },
  { path: 'components', module: ViewComponentsModule },
  { path: 'types', module: ComponentTypesModule },
];

const children: Routes = [
  { path: 'user', module: UsersModule, children: users },
  { path: 'entity-types', module: EntityTypesModule },
  { path: 'organizational', children: organizational },
  { path: 'permissions', module: PermissionsModule },
  { path: 'role', module: RolesModule, children: role },
  { path: 'view', children: view },
];

export const routes: RouteTree = {
  path: 'authorization',
  module: AuthorizationModule,
  children: children,
};
