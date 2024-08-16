import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { UserRoleContractsService } from '../user-role-contracts/user-role-contracts.service';
import { UserRoleResultsService } from '../user-role-results/user-role-results.service';
import { UserRolesRepository } from './user-roles.repository';

@Module({
  controllers: [UserRolesController],
  providers: [
    UserRolesService,
    UserRoleContractsService,
    UserRoleResultsService,
    UserRolesRepository,
  ],
  exports: [UserRolesService, UserRolesRepository],
})
export class UserRolesModule {}
