import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RoleFunctionalPermission } from './entities/role_functional_permission.entity';
import { CreateRoleFunctionalPermissionDto } from './dto/create-role_functional_permission.dto';
import { GetViewConfigurationDto } from '../view-configurations/dto/get-view-configuration.dto';
import { CreateViewConfigurationDto } from '../view-configurations/dto/create-view-configuration.dto';

@Injectable()
export class RoleFunctionalPermissionsService {
  constructor(private readonly dataSource: DataSource) {}

  async _getParentCodeAndArrayIds(
    components: CreateRoleFunctionalPermissionDto[],
  ) {
    let saveRoles: Partial<RoleFunctionalPermission>[] = [];
    saveRoles = components
      .map((component) =>
        component.roles.map((el) => ({
          role_id: el.role_id,
          view_configuration_code: component.component_code,
          write: el.write,
          is_active: el?.is_active,
        })),
      )
      .flat();

    return this.dataSource
      .getRepository(RoleFunctionalPermission)
      .save(saveRoles);
  }

  _mapRoleFunctionalPermission(schema: GetViewConfigurationDto) {
    const mappedNode = schema as unknown as CreateViewConfigurationDto;
    mappedNode.roles = schema.roles?.map((role) => ({
      role_id: role.role_id,
      write: role.write,
      is_active: role?.is_active,
      name: role.role.name,
    }));
    mappedNode.children = schema.children.map((child) =>
      this._mapRoleFunctionalPermission(child),
    );

    return mappedNode;
  }
}
