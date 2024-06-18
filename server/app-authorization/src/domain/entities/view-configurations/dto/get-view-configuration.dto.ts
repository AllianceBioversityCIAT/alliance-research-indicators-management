import { ApiProperty } from '@nestjs/swagger';
import { RoleFunctionalPermission } from '../../role_functional_permissions/entities/role_functional_permission.entity';

export class GetViewConfigurationDto {
  @ApiProperty()
  sec_view_configuration_code?: string;
  @ApiProperty()
  public component_code: string;
  @ApiProperty()
  public title: string;
  @ApiProperty()
  public description: string;
  @ApiProperty()
  public roles: RoleFunctionalPermission[];
  @ApiProperty()
  public configurations: any;
  @ApiProperty()
  public position: number;
  @ApiProperty()
  public hidden: boolean;
  @ApiProperty()
  public parent_code?: string;
  @ApiProperty({ isArray: true, type: GetViewConfigurationDto })
  public children: GetViewConfigurationDto[];
  @ApiProperty()
  public is_active: boolean;
}
