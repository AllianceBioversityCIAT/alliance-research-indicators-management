import { ApiProperty } from '@nestjs/swagger';
import { RoleFunctionalPermission } from '../../role_functional_permissions/entities/role_functional_permission.entity';

export class GetViewConfigurationDto {
  @ApiProperty()
  sec_view_configuration_code?: string;
  @ApiProperty()
  public client_element_code: string;
  @ApiProperty()
  public roles: RoleFunctionalPermission[];
  @ApiProperty({ isArray: true, type: GetViewConfigurationDto })
  public children: GetViewConfigurationDto[];
  @ApiProperty()
  public is_active: boolean;
}
