import { ApiProperty } from '@nestjs/swagger';

export class CreateViewConfigurationDto {
  @ApiProperty()
  sec_view_configuration_code?: string;
  @ApiProperty()
  public component_code: string;
  @ApiProperty()
  public title: string;
  @ApiProperty()
  public description: string;
  @ApiProperty()
  public roles: SaveRoles[];
  @ApiProperty()
  public configurations: any;
  @ApiProperty()
  public position: number;
  @ApiProperty()
  public hidden: boolean;
  @ApiProperty()
  public parent_code?: string;
  @ApiProperty({ isArray: true, type: CreateViewConfigurationDto })
  public children: CreateViewConfigurationDto[];
  @ApiProperty()
  public is_active: boolean;
}

export class SaveRoles {
  @ApiProperty()
  role_id: number;
  @ApiProperty()
  write: boolean;
  @ApiProperty()
  is_active?: boolean;
}
