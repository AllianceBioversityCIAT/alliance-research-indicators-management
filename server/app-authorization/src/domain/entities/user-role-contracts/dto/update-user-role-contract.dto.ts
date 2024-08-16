import { PartialType } from '@nestjs/swagger';
import { CreateUserRoleContractDto } from './create-user-role-contract.dto';

export class UpdateUserRoleContractDto extends PartialType(
  CreateUserRoleContractDto,
) {}
