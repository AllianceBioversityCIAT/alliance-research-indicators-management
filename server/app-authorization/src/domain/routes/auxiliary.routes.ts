import { Routes, RouteTree } from '@nestjs/core';
import { TemplateModule } from '../auxiliary/template/template.module';

const auxiliary: Routes = [
  {
    path: 'template',
    module: TemplateModule,
  },
];

export const routes: RouteTree = {
  path: 'auxiliary',
  children: auxiliary,
};
