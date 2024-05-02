import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { HttpModule } from '@nestjs/axios';
import { OrganizationalEntitiesModule } from './organizational-entities/organizational-entities.module';
import { OrganizationalEntityRolesModule } from './organizational-entity-roles/organizational-entity-roles.module';
import { EntityTypesModule } from './entity-types/entity-types.module';
import { UserOrganizationalEntityRolesModule } from './user-organizational-entity-roles/user-organizational-entity-roles.module';
import { OrganizationalEntityRolePermissionsModule } from './organizational-entity-role-permissions/organizational-entity-role-permissions.module';
import { PermissionsModule } from './permissions/permissions.module';
import { CognitoStrategy } from '../tools/AWS/cognito.strategy';
import { RoleFocusModule } from './role-focus/role-focus.module';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService, CognitoStrategy],
  imports: [
    RolesModule,
    UsersModule,
    HttpModule,
    OrganizationalEntitiesModule,
    EntityTypesModule,
    OrganizationalEntityRolesModule,
    UserOrganizationalEntityRolesModule,
    OrganizationalEntityRolePermissionsModule,
    PermissionsModule,
    RoleFocusModule,
  ],
  exports: [
    RolesModule,
    UsersModule,
    HttpModule,
    OrganizationalEntitiesModule,
    EntityTypesModule,
    OrganizationalEntityRolesModule,
    UserOrganizationalEntityRolesModule,
    OrganizationalEntityRolePermissionsModule,
    PermissionsModule,
    RoleFocusModule,
  ],
})
export class AuthorizationModule {}
