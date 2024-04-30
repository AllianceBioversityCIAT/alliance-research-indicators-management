import { Module } from '@nestjs/common';
import { UserOrganizationalEntityRolesService } from './user-organizational-entity-roles.service';
import { UserOrganizationalEntityRolesController } from './user-organizational-entity-roles.controller';

@Module({
  controllers: [UserOrganizationalEntityRolesController],
  providers: [UserOrganizationalEntityRolesService],
})
export class UserOrganizationalEntityRolesModule {}
