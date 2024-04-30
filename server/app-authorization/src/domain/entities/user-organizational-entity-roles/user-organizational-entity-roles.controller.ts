import { Controller } from '@nestjs/common';
import { UserOrganizationalEntityRolesService } from './user-organizational-entity-roles.service';

@Controller('user-organizational-entity-roles')
export class UserOrganizationalEntityRolesController {
  constructor(
    private readonly userOrganizationalEntityRolesService: UserOrganizationalEntityRolesService,
  ) {}
}
