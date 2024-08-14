import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { HttpModule } from '@nestjs/axios';
import { OrganizationalEntitiesModule } from './organizational-entities/organizational-entities.module';
import { EntityTypesModule } from './entity-types/entity-types.module';
import { EndpointPermissionsModule } from './endpoint-permissions/endpoint-permissions.module';
import { CognitoStrategy } from '../tools/AWS/cognito/cognito.strategy';
import { RoleFocusModule } from './role-focus/role-focus.module';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';
import { ViewConfigurationsModule } from './view-configurations/view-configurations.module';
import { ElementypesModule } from './element-types/element-types.module';
import { UserRolesModule } from './user_roles/user_roles.module';
import { RoleEndpointPermissionsModule } from './role_endpoint_permissions/role_endpoint_permissions.module';
import { CognitoService } from '../tools/AWS/cognito/cognito.service';
import { UserRoleResultsModule } from './user_role_results/user_role_results.module';
import { UserRoleContractsModule } from './user_role_contracts/user_role_contracts.module';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService, CognitoStrategy, CognitoService],
  imports: [
    RolesModule,
    UsersModule,
    HttpModule,
    OrganizationalEntitiesModule,
    ElementypesModule,
    EndpointPermissionsModule,
    RoleFocusModule,
    JwtModule.register({
      secret: process.env.ARIM_JWT_SECRET,
      signOptions: { expiresIn: process.env.ARIM_JWT_ACCESS_EXPIRES_IN },
    }),
    RefreshTokensModule,
    ViewConfigurationsModule,
    EntityTypesModule,
    UserRolesModule,
    RoleEndpointPermissionsModule,
    UserRoleResultsModule,
    UserRoleContractsModule,
  ],
  exports: [],
})
export class AuthorizationModule {}
