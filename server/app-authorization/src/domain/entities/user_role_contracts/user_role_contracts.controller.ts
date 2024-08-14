import { Controller } from '@nestjs/common';
import { UserRoleContractsService } from './user_role_contracts.service';

@Controller('user-role-contracts')
export class UserRoleContractsController {
  constructor(
    private readonly userRoleContractsService: UserRoleContractsService,
  ) {}
}
