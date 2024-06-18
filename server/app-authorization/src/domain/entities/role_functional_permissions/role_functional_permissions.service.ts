import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RoleFunctionalPermission } from './entities/role_functional_permission.entity';
import { CreateRoleFunctionalPermissionDto } from './dto/create-role_functional_permission.dto';

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
}
