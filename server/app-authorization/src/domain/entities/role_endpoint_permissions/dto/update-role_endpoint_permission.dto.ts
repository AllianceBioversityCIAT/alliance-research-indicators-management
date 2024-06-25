import { PartialType } from '@nestjs/swagger';
import { CreateRoleEndpointPermissionDto } from './create-role_endpoint_permission.dto';

export class UpdateRoleEndpointPermissionDto extends PartialType(
  CreateRoleEndpointPermissionDto,
) {}
