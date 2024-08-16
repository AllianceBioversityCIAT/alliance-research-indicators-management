import { PartialType } from '@nestjs/swagger';
import { CreateRoleEndpointPermissionDto } from './create-role-endpoint-permission.dto';

export class UpdateRoleEndpointPermissionDto extends PartialType(
  CreateRoleEndpointPermissionDto,
) {}
