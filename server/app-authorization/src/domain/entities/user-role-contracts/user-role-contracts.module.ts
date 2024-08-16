import { Module } from '@nestjs/common';
import { UserRoleContractsService } from './user-role-contracts.service';
import { UserRoleContractsController } from './user-role-contracts.controller';

@Module({
  controllers: [UserRoleContractsController],
  providers: [UserRoleContractsService],
})
export class UserRoleContractsModule {}
