import { Module } from '@nestjs/common';
import { RoleEndpointPermissionsService } from './role-endpoint-permissions.service';
import { RoleEndpointPermissionsController } from './role-endpoint-permissions.controller';

@Module({
  controllers: [RoleEndpointPermissionsController],
  providers: [RoleEndpointPermissionsService],
})
export class RoleEndpointPermissionsModule {}
