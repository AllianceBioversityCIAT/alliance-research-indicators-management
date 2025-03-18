import { ApiProperty } from '@nestjs/swagger';
import { PermissionStateEnum } from '../../role-functional-permissions/enum/permission-state.enum';

export class SaveRoles {
  @ApiProperty({
    description: 'The id of the role',
    example: 1,
    nullable: false,
    type: Number,
  })
  role_id: number;
  @ApiProperty({
    description: 'The create permission state',
    example: 'true',
    nullable: false,
    type: String,
  })
  create: PermissionStateEnum;
  @ApiProperty({
    description: 'The read permission state',
    example: 'true',
    nullable: false,
    type: String,
  })
  read: PermissionStateEnum;
  @ApiProperty({
    description: 'The update permission state',
    example: 'true',
    nullable: false,
    type: String,
  })
  update: PermissionStateEnum;
  @ApiProperty({
    description: 'The delete permission state',
    example: 'true',
    nullable: false,
    type: String,
  })
  delete: PermissionStateEnum;
  @ApiProperty({
    description: 'The execute permission state',
    example: 'N/A',
    nullable: false,
    type: String,
  })
  execute: PermissionStateEnum;
  @ApiProperty({
    description: 'The name of the role',
    example: 'role-name',
    nullable: true,
    type: String,
    required: false,
  })
  name: string;
  @ApiProperty({
    description: 'The state of the role',
    example: true,
    nullable: false,
    type: Boolean,
  })
  is_active?: boolean;
}
export class CreateViewConfigurationDto {
  @ApiProperty({
    description: 'The code of the view configuration',
    example: '00000000-0000-0000-0000-000000000000',
    nullable: true,
    type: String,
  })
  sec_view_configuration_code?: string;
  @ApiProperty({
    description: 'The code of the client element',
    example: 'client-code',
    nullable: false,
    type: String,
  })
  public client_element_code: string;
  @ApiProperty({
    description: 'The id of the element type',
    example: 1,
    nullable: false,
    type: Number,
  })
  element_type_id!: number;
  @ApiProperty({
    description: 'The element type',
    example: [
      {
        role_id: 1,
        create: 'true',
        read: 'true',
        update: 'true',
        delete: 'true',
        execute: 'N/A',
        name: 'role-name',
        is_active: true,
      },
    ],
    nullable: false,
    isArray: true,
    type: SaveRoles,
  })
  public roles: SaveRoles[];
  @ApiProperty({
    isArray: true,
    type: CreateViewConfigurationDto,
    description: 'The children of the view configuration',
    default: [
      {
        sec_view_configuration_code: '11111111-1111-1111-1111-111111111111',
        client_element_code: 'client-code-2',
        element_type_id: 2,
        roles: [
          {
            role_id: 1,
            create: 'N/A',
            read: 'true',
            update: 'true',
            delete: 'true',
            execute: 'N/A',
            name: 'role-name',
            is_active: true,
          },
        ],
        children: [],
        is_active: true,
      },
    ],
  })
  public children: CreateViewConfigurationDto[];
  @ApiProperty({
    description: 'The parent of the view configuration',
    type: Boolean,
    default: true,
  })
  public is_active: boolean;
}
