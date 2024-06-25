import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, IsNull } from 'typeorm';
import { ViewConfiguration } from './entities/view-configuration.entity';
import { ResponseUtils } from '../../shared/utils/response.utils';
import {
  addNodeCodeInTree,
  filterActiveDescendants,
  mapTree,
  mapTreeToArray,
} from '../../shared/utils/trees.utils';
import { ServiceResponseDto } from '../../shared/global-dto/service-response.dto';
import { CreateViewConfigurationDto } from './dto/create-view-configuration.dto';
import { CreateRoleFunctionalPermissionDto } from '../role_functional_permissions/dto/create-role_functional_permission.dto';
import { RoleFunctionalPermissionsService } from '../role_functional_permissions/role_functional_permissions.service';
import { GetViewConfigurationDto } from './dto/get-view-configuration.dto';

@Injectable()
export class ViewConfigurationsService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly _roleFunctionalPermissionsService: RoleFunctionalPermissionsService,
  ) {}

  async getSchemaByRootCode(
    code: string,
  ): Promise<ServiceResponseDto<CreateViewConfigurationDto>> {
    const parentNode: ViewConfiguration = await this.dataSource
      .getTreeRepository(ViewConfiguration)
      .findOne({
        where: {
          sec_view_configuration_code: code,
          is_active: true,
          component: { component_type_id: 1 },
          parent_code: IsNull(),
        },
        relations: ['component', 'role_functional_permission_list'],
      });

    if (!parentNode) {
      throw new NotFoundException(
        `The view configuration with code ${code} was not found`,
      );
    }

    return this.dataSource
      .getTreeRepository(ViewConfiguration)
      .findDescendantsTree(parentNode, {
        relations: ['component', 'role_functional_permission_list'],
      })
      .then((descendants) => this._formatGetData(descendants))
      .then((descendants: CreateViewConfigurationDto) =>
        ResponseUtils.format({
          status: HttpStatus.OK,
          description: `View Components found successfully`,
          data: descendants,
        }),
      );
  }

  _formatGetData(
    data: ViewConfiguration | ViewConfiguration[],
  ): CreateViewConfigurationDto | CreateViewConfigurationDto[] {
    const isArray: boolean = Array.isArray(data);
    let tempData: ViewConfiguration[];
    if (isArray) {
      tempData = data as ViewConfiguration[];
    } else {
      tempData = [data as ViewConfiguration];
    }

    const onlyActive = filterActiveDescendants<ViewConfiguration>(
      tempData,
    ) as ViewConfiguration[];

    const trees = onlyActive.map((node) =>
      mapTree<ViewConfiguration, GetViewConfigurationDto>(node, {
        role_functional_permission_list: 'roles',
        sec_view_configuration_code: 'sec_view_configuration_code',
        component_code: 'component_code',
        title: 'title',
        description: 'description',
        position: 'position',
        configurations: 'configurations',
        hidden: 'hidden',
        parent_code: 'parent_code',
        is_active: 'is_active',
      }),
    );

    const treeResponse = trees.map((tree) =>
      this._roleFunctionalPermissionsService._mapRoleFunctionalPermission(tree),
    );

    return isArray ? treeResponse : treeResponse[0];
  }

  async getSchema(): Promise<ServiceResponseDto<CreateViewConfigurationDto[]>> {
    const nodeTrees = await this.dataSource
      .getTreeRepository(ViewConfiguration)
      .findTrees({
        relations: ['component', 'role_functional_permission_list'],
      });

    const treeResponse = this._formatGetData(
      nodeTrees,
    ) as CreateViewConfigurationDto[];

    return ResponseUtils.format({
      status: HttpStatus.OK,
      description: `View Components found successfully`,
      data: treeResponse,
    });
  }

  async createSchema(
    schema: CreateViewConfigurationDto,
  ): Promise<ServiceResponseDto<ViewConfiguration>> {
    const prepareCode = addNodeCodeInTree<CreateViewConfigurationDto>(
      schema,
      'sec_view_configuration_code',
    );

    const saveTree = mapTree<CreateViewConfigurationDto, ViewConfiguration>(
      prepareCode,
      {
        sec_view_configuration_code: 'sec_view_configuration_code',
        component_code: 'component_code',
        configurations: 'configurations',
        description: 'description',
        position: 'position',
        title: 'title',
      },
    );

    const saveRoles = mapTreeToArray<
      CreateViewConfigurationDto,
      CreateRoleFunctionalPermissionDto
    >(prepareCode, {
      roles: 'roles',
      sec_view_configuration_code: 'component_code',
    });

    const responseSchema = await this.dataSource
      .transaction(async (manager) => {
        const node: ViewConfiguration = await manager
          .getTreeRepository(ViewConfiguration)
          .save(saveTree);

        return manager
          .getTreeRepository(ViewConfiguration)
          .findDescendantsTree(node, { relations: ['component'] });
      })
      .then((node) =>
        ResponseUtils.format({
          status: HttpStatus.CREATED,
          description: `View Component created successfully`,
          data: node,
        }),
      );

    await this._roleFunctionalPermissionsService._getParentCodeAndArrayIds(
      saveRoles,
    );

    return responseSchema;
  }

  async updateSchema(
    code: string,
    schema: CreateViewConfigurationDto,
  ): Promise<ServiceResponseDto<ViewConfiguration>> {
    const rootNode = await this.dataSource
      .getTreeRepository(ViewConfiguration)
      .findOne({
        where: { sec_view_configuration_code: code, is_active: true },
      });

    if (!rootNode) {
      throw new NotFoundException(
        `The view configuration with code ${code} was not found`,
      );
    }

    schema.sec_view_configuration_code = rootNode.sec_view_configuration_code;

    return this.createSchema(schema);
  }
}
