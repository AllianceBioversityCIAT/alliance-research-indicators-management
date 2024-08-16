import { PartialType } from '@nestjs/swagger';
import { CreateUserRoleResultDto } from './create-user-role-result.dto';

export class UpdateUserRoleResultDto extends PartialType(
  CreateUserRoleResultDto,
) {}
