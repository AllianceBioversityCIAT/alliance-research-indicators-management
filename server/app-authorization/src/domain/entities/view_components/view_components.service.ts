import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ServiceResponseDto } from '../../shared/global-dto/service-response.dto';
import { ViewComponent } from './entities/view_component.entity';
import { ResponseUtils } from '../../shared/utils/response.utils';
import { CreateViewComponentListDto } from './dto/create-view_component.dto';

@Injectable()
export class ViewComponentsService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(): Promise<ServiceResponseDto<ViewComponent[]>> {
    return this.dataSource
      .getRepository(ViewComponent)
      .find({
        where: {
          is_active: true,
        },
      })
      .then((viewComponents: ViewComponent[]) =>
        ResponseUtils.format({
          status: HttpStatus.OK,
          description: `View Components found successfully`,
          data: viewComponents,
        }),
      );
  }

  async create(
    viewComponent: CreateViewComponentListDto,
  ): Promise<ServiceResponseDto<ViewComponent[]>> {
    const saveComponents: Partial<ViewComponent>[] =
      viewComponent.view_components.map((component) => ({
        sec_view_component_id: component.sec_view_component_id,
        component_type_id: component.component_type_id,
      }));
    return this.dataSource
      .getRepository(ViewComponent)
      .save(saveComponents)
      .then((viewComponent) =>
        ResponseUtils.format({
          status: HttpStatus.CREATED,
          description: `View Component created successfully`,
          data: viewComponent,
        }),
      );
  }
}
