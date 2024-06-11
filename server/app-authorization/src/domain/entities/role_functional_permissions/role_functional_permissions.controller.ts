import { Controller } from '@nestjs/common';
import { RoleFunctionalPermissionsService } from './role_functional_permissions.service';

@Controller('role-functional-permissions')
export class RoleFunctionalPermissionsController {
  constructor(
    private readonly roleFunctionalPermissionsService: RoleFunctionalPermissionsService,
  ) {}
}
