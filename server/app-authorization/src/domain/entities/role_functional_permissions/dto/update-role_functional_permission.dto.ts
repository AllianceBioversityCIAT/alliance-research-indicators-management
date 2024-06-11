import { PartialType } from '@nestjs/swagger';
import { CreateRoleFunctionalPermissionDto } from './create-role_functional_permission.dto';

export class UpdateRoleFunctionalPermissionDto extends PartialType(
  CreateRoleFunctionalPermissionDto,
) {}
