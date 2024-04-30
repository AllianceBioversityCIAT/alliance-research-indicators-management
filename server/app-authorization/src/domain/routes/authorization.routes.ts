import { Routes, RouteTree } from '@nestjs/core';
import { RolesModule } from '../entities/roles/roles.module';
import { UsersModule } from '../entities/users/users.module';
import { AuthorizationModule } from '../entities/authorization.module';

const children: Routes = [
  { path: 'roles', module: RolesModule },
  { path: 'users', module: UsersModule },
];

export const routes: RouteTree = {
  path: 'authorization',
  module: AuthorizationModule,
  children: children,
};
