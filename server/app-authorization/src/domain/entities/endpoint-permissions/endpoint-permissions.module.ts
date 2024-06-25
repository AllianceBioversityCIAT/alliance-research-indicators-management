import { Module } from '@nestjs/common';
import { EndpointPermissionsService } from './endpoint-permissions.service';
import { EndpointPermissionsController } from './endpoint-permissions.controller';

@Module({
  controllers: [EndpointPermissionsController],
  providers: [EndpointPermissionsService],
})
export class EndpointPermissionsModule {}
