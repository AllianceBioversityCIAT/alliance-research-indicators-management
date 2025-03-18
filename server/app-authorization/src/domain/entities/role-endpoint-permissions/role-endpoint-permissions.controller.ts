import { Controller } from '@nestjs/common';
import { RoleEndpointPermissionsService } from './role-endpoint-permissions.service';

@Controller()
export class RoleEndpointPermissionsController {
  constructor(
    private readonly roleEndpointPermissionsService: RoleEndpointPermissionsService,
  ) {}
}
