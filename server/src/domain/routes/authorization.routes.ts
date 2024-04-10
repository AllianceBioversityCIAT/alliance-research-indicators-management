import { Routes, RouteTree } from '@nestjs/core';
import { AuthorizationModule } from '../authorization/authorization.module';
import { RolesModule } from '../authorization/roles/roles.module';
import { UsersModule } from '../authorization/users/users.module';

const children: Routes = [
  { path: 'roles', module: RolesModule },
  { path: 'users', module: UsersModule },
];

export const routes: RouteTree = {
  path: 'authorization',
  module: AuthorizationModule,
  children: children,
};
