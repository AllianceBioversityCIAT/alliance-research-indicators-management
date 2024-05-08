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
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';

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
    JwtModule.register({
      secret: process.env.ARIM_JWT_SECRET,
      signOptions: { expiresIn: process.env.ARIM_JWT_ACCESS_EXPIRES_IN },
    }),
    RefreshTokensModule,
  ],
  exports: [],
})
export class AuthorizationModule {}
