import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRolesModule } from '../user-roles/user-roles.module';
import { UserAgressoContractService } from '../../complementary-entities/secondary/user-agresso-contracts/user-agresso-contract.service';
import { UserRepository } from './repositories/users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserAgressoContractService, UserRepository],
  imports: [UserRolesModule],
  exports: [UsersService, UserAgressoContractService, UserRepository],
})
export class UsersModule {}
