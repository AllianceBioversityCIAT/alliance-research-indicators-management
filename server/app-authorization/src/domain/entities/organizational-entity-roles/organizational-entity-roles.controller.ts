import { Controller } from '@nestjs/common';
import { OrganizationalEntityRolesService } from './organizational-entity-roles.service';

@Controller()
export class OrganizationalEntityRolesController {
  constructor(
    private readonly organizationalEntityRolesService: OrganizationalEntityRolesService,
  ) {}
}
