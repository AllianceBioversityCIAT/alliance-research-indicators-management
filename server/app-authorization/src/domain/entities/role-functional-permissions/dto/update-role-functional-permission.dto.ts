import { PartialType } from '@nestjs/swagger';
import { CreateRoleFunctionalPermissionDto } from './create-role-functional-permission.dto';

export class UpdateRoleFunctionalPermissionDto extends PartialType(
  CreateRoleFunctionalPermissionDto,
) {}
