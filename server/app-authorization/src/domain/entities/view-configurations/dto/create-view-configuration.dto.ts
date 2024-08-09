import { ApiProperty } from '@nestjs/swagger';
import { PermissionStateEnum } from '../../role_functional_permissions/enum/permission-state.enum';

export class CreateViewConfigurationDto {
  @ApiProperty()
  sec_view_configuration_code?: string;
  @ApiProperty()
  public client_element_code: string;
  @ApiProperty()
  public roles: SaveRoles[];
  @ApiProperty({ isArray: true, type: CreateViewConfigurationDto })
  public children: CreateViewConfigurationDto[];
  @ApiProperty()
  public is_active: boolean;
}

export class SaveRoles {
  @ApiProperty()
  role_id: number;
  @ApiProperty()
  create: PermissionStateEnum;
  @ApiProperty()
  read: PermissionStateEnum;
  @ApiProperty()
  update: PermissionStateEnum;
  @ApiProperty()
  delete: PermissionStateEnum;
  @ApiProperty()
  execute: PermissionStateEnum;
  @ApiProperty()
  name: string;
  @ApiProperty()
  is_active?: boolean;
}
