import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRolesModule } from '../user-roles/user-roles.module';
import { UserAgressoContractService } from '../../complementary-entities/secondary/user-agresso-contracts/user-agresso-contract.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserAgressoContractService],
  imports: [UserRolesModule],
  exports: [UsersService, UserAgressoContractService],
})
export class UsersModule {}
