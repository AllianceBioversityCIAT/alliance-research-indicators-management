import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { CognitoStrategy } from '../tools/AWS/cognito.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService, CognitoStrategy],
  imports: [RolesModule, UsersModule, HttpModule],
})
export class AuthorizationModule {}
