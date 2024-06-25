import { Module } from '@nestjs/common';
import { RoleEndpointPermissionsService } from './role_endpoint_permissions.service';
import { RoleEndpointPermissionsController } from './role_endpoint_permissions.controller';

@Module({
  controllers: [RoleEndpointPermissionsController],
  providers: [RoleEndpointPermissionsService],
})
export class RoleEndpointPermissionsModule {}
