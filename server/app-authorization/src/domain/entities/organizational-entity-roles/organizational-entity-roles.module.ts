import { Module } from '@nestjs/common';
import { OrganizationalEntityRolesService } from './organizational-entity-roles.service';
import { OrganizationalEntityRolesController } from './organizational-entity-roles.controller';

@Module({
  controllers: [OrganizationalEntityRolesController],
  providers: [OrganizationalEntityRolesService],
})
export class OrganizationalEntityRolesModule {}
