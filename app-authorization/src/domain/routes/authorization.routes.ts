import { Routes, RouteTree } from '@nestjs/core';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';
import { AuthorizationModule } from '../authorization.module';

const children: Routes = [
  { path: 'roles', module: RolesModule },
  { path: 'users', module: UsersModule },
];

export const routes: RouteTree = {
  path: 'authorization',
  module: AuthorizationModule,
  children: children,
};
