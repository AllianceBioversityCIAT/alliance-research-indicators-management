import { Controller } from '@nestjs/common';
import { UserRoleResultsService } from './user_role_results.service';

@Controller('user-role-results')
export class UserRoleResultsController {
  constructor(
    private readonly userRoleResultsService: UserRoleResultsService,
  ) {}
}
