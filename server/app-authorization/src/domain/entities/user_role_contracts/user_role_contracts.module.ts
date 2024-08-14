import { Module } from '@nestjs/common';
import { UserRoleContractsService } from './user_role_contracts.service';
import { UserRoleContractsController } from './user_role_contracts.controller';

@Module({
  controllers: [UserRoleContractsController],
  providers: [UserRoleContractsService],
})
export class UserRoleContractsModule {}
