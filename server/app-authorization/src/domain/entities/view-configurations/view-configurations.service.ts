import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ViewConfiguration } from './entities/view-configuration.entity';
import { ResponseUtils } from '../../shared/utils/response.utils';

@Injectable()
export class ViewConfigurationsService {
  constructor(private readonly dataSource: DataSource) {}

  async getSchemaBySection(component_code: string) {
    const parentNode: ViewConfiguration = await this.dataSource
      .getTreeRepository(ViewConfiguration)
      .findOne({
        where: {
          component_code: component_code,
          is_active: true,
          component: { component_type_id: 1 },
        },
      });

    return this.dataSource
      .getTreeRepository(ViewConfiguration)
      .findDescendantsTree(parentNode)
      .then((descendants) =>
        ResponseUtils.format({
          status: HttpStatus.OK,
          description: `View Components found successfully`,
          data: descendants,
        }),
      );
  }
}
