import { Module } from '@nestjs/common';
import { UserRoleResultsService } from './user-role-results.service';
import { UserRoleResultsController } from './user-role-results.controller';

@Module({
  controllers: [UserRoleResultsController],
  providers: [UserRoleResultsService],
})
export class UserRoleResultsModule {}
