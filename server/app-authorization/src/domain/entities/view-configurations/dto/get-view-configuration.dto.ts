import { ApiProperty } from '@nestjs/swagger';
import { RoleFunctionalPermission } from '../../role-functional-permissions/entities/role-functional-permission.entity';
import { ElementType } from '../../element-types/entities/element-type.entity';

export class GetViewConfigurationDto {
  @ApiProperty()
  public sec_view_configuration_code?: string;
  @ApiProperty()
  public client_element_code: string;
  @ApiProperty()
  public element_type_id!: number;
  @ApiProperty()
  public element_type: ElementType;
  @ApiProperty()
  public roles: RoleFunctionalPermission[];
  @ApiProperty({ isArray: true, type: GetViewConfigurationDto })
  public children: GetViewConfigurationDto[];
  @ApiProperty()
  public is_active: boolean;
}
