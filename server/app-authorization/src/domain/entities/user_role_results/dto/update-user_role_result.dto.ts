import { PartialType } from '@nestjs/swagger';
import { CreateUserRoleResultDto } from './create-user_role_result.dto';

export class UpdateUserRoleResultDto extends PartialType(
  CreateUserRoleResultDto,
) {}
