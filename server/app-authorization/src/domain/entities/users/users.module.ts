import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRolesModule } from '../user-roles/user-roles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [UserRolesModule],
  exports: [UsersService],
})
export class UsersModule {}
