import { Module } from '@nestjs/common';
import { UserRoleResultsService } from './user_role_results.service';
import { UserRoleResultsController } from './user_role_results.controller';

@Module({
  controllers: [UserRoleResultsController],
  providers: [UserRoleResultsService],
})
export class UserRoleResultsModule {}
