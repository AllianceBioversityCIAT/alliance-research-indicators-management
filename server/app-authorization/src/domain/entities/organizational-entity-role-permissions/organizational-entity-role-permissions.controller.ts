import { Controller } from '@nestjs/common';
import { OrganizationalEntityRolePermissionsService } from './organizational-entity-role-permissions.service';

@Controller()
export class OrganizationalEntityRolePermissionsController {
  constructor(
    private readonly organizationalEntityRolePermissionsService: OrganizationalEntityRolePermissionsService,
  ) {}
}
