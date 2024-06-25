import { Controller } from '@nestjs/common';
import { RoleEndpointPermissionsService } from './role_endpoint_permissions.service';

@Controller()
export class RoleEndpointPermissionsController {
  constructor(
    private readonly roleEndpointPermissionsService: RoleEndpointPermissionsService,
  ) {}
}
