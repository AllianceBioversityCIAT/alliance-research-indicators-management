import { Controller } from '@nestjs/common';
import { UserRoleResultsService } from './user-role-results.service';

@Controller('user-role-results')
export class UserRoleResultsController {
  constructor(
    private readonly userRoleResultsService: UserRoleResultsService,
  ) {}
}
