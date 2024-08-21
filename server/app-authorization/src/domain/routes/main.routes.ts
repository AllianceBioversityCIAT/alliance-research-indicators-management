import { Routes } from '@nestjs/core';
import { routes as authorization } from '../routes/authorization.routes';
import { routes as auxiliary } from './auxiliary.routes';

export const routes: Routes = [
  {
    path: 'api',
    children: [authorization, auxiliary],
  },
];
