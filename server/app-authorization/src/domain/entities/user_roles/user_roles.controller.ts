import { Controller } from '@nestjs/common';
import { UserRolesService } from './user_roles.service';

@Controller()
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}
}
