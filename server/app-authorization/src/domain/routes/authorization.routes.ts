import { Routes, RouteTree } from '@nestjs/core';
import { RolesModule } from '../entities/roles/roles.module';
import { UsersModule } from '../entities/users/users.module';
import { AuthorizationModule } from '../entities/authorization.module';
import { OrganizationalEntitiesModule } from '../entities/organizational-entities/organizational-entities.module';
import { EntityTypesModule } from '../entities/entity-types/entity-types.module';
import { EndpointPermissionsModule } from '../entities/endpoint-permissions/endpoint-permissions.module';
import { RoleFocusModule } from '../entities/role-focus/role-focus.module';
import { UserRolesModule } from '../entities/user_roles/user_roles.module';
import { RoleFunctionalPermissionsModule } from '../entities/role_functional_permissions/role_functional_permissions.module';
import { ElementypesModule } from '../entities/element-types/element-types.module';
import { ViewConfigurationsModule } from '../entities/view-configurations/view-configurations.module';
import { RoleEndpointPermissionsModule } from '../entities/role_endpoint_permissions/role_endpoint_permissions.module';

const organizational: Routes = [
  { path: 'entities', module: OrganizationalEntitiesModule },
];

const role: Routes = [
  { path: 'focus', module: RoleFocusModule },
  { path: 'functional-permission', module: RoleFunctionalPermissionsModule },
  { path: 'endpoint-permissions', module: RoleEndpointPermissionsModule },
];

const users: Routes = [{ path: 'roles', module: UserRolesModule }];

const view: Routes = [
  { path: 'configurations', module: ViewConfigurationsModule },
  { path: 'types', module: ElementypesModule },
];

const children: Routes = [
  { path: 'user', module: UsersModule, children: users },
  { path: 'entity-types', module: EntityTypesModule },
  { path: 'organizational', children: organizational },
  { path: 'role', module: RolesModule, children: role },
  { path: 'endpoint-permissions', module: EndpointPermissionsModule },
  { path: 'view', children: view },
];

export const routes: RouteTree = {
  path: 'authorization',
  module: AuthorizationModule,
  children: children,
};
