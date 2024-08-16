import { Controller } from '@nestjs/common';
import { UserRoleContractsService } from './user-role-contracts.service';

@Controller('user-role-contracts')
export class UserRoleContractsController {
  constructor(
    private readonly userRoleContractsService: UserRoleContractsService,
  ) {}
}
