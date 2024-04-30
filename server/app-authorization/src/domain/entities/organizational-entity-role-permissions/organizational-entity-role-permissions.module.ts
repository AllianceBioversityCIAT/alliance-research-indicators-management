import { Module } from '@nestjs/common';
import { OrganizationalEntityRolePermissionsService } from './organizational-entity-role-permissions.service';
import { OrganizationalEntityRolePermissionsController } from './organizational-entity-role-permissions.controller';

@Module({
  controllers: [OrganizationalEntityRolePermissionsController],
  providers: [OrganizationalEntityRolePermissionsService],
})
export class OrganizationalEntityRolePermissionsModule {}
