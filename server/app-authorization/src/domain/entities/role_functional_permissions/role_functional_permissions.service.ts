import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere } from 'typeorm';
import { RoleFunctionalPermission } from './entities/role_functional_permission.entity';
import { CreateRoleFunctionalPermissionDto } from './dto/create-role_functional_permission.dto';
import { GetViewConfigurationDto } from '../view-configurations/dto/get-view-configuration.dto';
import { CreateViewConfigurationDto } from '../view-configurations/dto/create-view-configuration.dto';
import { ResponseUtils } from '../../shared/utils/response.utils';

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
          create: el.create,
          read: el.read,
          update: el.update,
          delete: el.delete,
          execute: el.execute,
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
      create: role.create,
      read: role.read,
      update: role.update,
      delete: role.delete,
      execute: role.execute,
      is_active: role?.is_active,
      name: role.role.name,
    }));
    mappedNode.children = schema.children.map((child) =>
      this._mapRoleFunctionalPermission(child),
    );

    return mappedNode;
  }

  async find(roleId: number) {
    const where: FindOptionsWhere<RoleFunctionalPermission> = {
      role: {
        is_active: true,
      },
      is_active: true,
    };

    if (roleId !== undefined && roleId !== null && !Number.isNaN(roleId))
      where.role_id = roleId;

    return this.dataSource
      .getRepository(RoleFunctionalPermission)
      .find({
        where,
        relations: {
          view_configuration: {
            element_type: true,
          },
        },
      })
      .then((roleFunctionalPermissions) =>
        ResponseUtils.format({
          status: HttpStatus.OK,
          description: 'Role functional permissions found successfully',
          data: roleFunctionalPermissions,
        }),
      );
  }
}
