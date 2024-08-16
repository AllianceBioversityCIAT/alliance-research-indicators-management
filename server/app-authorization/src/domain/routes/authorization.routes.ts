import { Routes, RouteTree } from '@nestjs/core';
import { RolesModule } from '../entities/roles/roles.module';
import { UsersModule } from '../entities/users/users.module';
import { AuthorizationModule } from '../entities/authorization.module';
import { OrganizationalEntitiesModule } from '../entities/organizational-entities/organizational-entities.module';
import { EntityTypesModule } from '../entities/entity-types/entity-types.module';
import { EndpointPermissionsModule } from '../entities/endpoint-permissions/endpoint-permissions.module';
import { RoleFocusModule } from '../entities/role-focus/role-focus.module';
import { UserRolesModule } from '../entities/user-roles/user-roles.module';
import { RoleFunctionalPermissionsModule } from '../entities/role-functional-permissions/role-functional-permissions.module';
import { ElementypesModule } from '../entities/element-types/element-types.module';
import { ViewConfigurationsModule } from '../entities/view-configurations/view-configurations.module';
import { RoleEndpointPermissionsModule } from '../entities/role-endpoint-permissions/role-endpoint-permissions.module';

const organizational: Routes = [
  { path: 'entities', module: OrganizationalEntitiesModule },
];

const role: Routes = [
  { path: 'focus', module: RoleFocusModule },
  { path: 'functional-permission', module: RoleFunctionalPermissionsModule },
  { path: 'endpoint-permissions', module: RoleEndpointPermissionsModule },
];

const view: Routes = [
  { path: 'configurations', module: ViewConfigurationsModule },
  { path: 'element/type', module: ElementypesModule },
];

const children: Routes = [
  { path: 'user-roles', module: UserRolesModule },
  { path: 'users', module: UsersModule },
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
