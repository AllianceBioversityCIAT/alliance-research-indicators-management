import { Controller } from '@nestjs/common';
import { OrganizationalEntityRolesService } from './organizational-entity-roles.service';

@Controller('organizational-entity-roles')
export class OrganizationalEntityRolesController {
  constructor(
    private readonly organizationalEntityRolesService: OrganizationalEntityRolesService,
  ) {}
}
