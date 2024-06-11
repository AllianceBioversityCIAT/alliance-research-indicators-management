import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRolesModule } from '../user_roles/user_roles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [UserRolesModule],
})
export class UsersModule {}
