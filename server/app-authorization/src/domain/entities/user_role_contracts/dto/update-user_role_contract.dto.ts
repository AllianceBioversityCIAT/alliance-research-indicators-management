import { PartialType } from '@nestjs/swagger';
import { CreateUserRoleContractDto } from './create-user_role_contract.dto';

export class UpdateUserRoleContractDto extends PartialType(
  CreateUserRoleContractDto,
) {}
