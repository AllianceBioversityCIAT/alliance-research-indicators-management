import { Controller } from '@nestjs/common';
import { OrganizationalEntityRolePermissionsService } from './organizational-entity-role-permissions.service';

@Controller('organizational-entity-role-permissions')
export class OrganizationalEntityRolePermissionsController {
  constructor(
    private readonly organizationalEntityRolePermissionsService: OrganizationalEntityRolePermissionsService,
  ) {}
}
