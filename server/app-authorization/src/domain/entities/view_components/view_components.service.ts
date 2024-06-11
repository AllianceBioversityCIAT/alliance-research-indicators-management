import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ServiceResponseDto } from '../../shared/global-dto/service-response.dto';
import { ViewComponent } from './entities/view_component.entity';
import { ResponseUtils } from '../../shared/utils/response.utils';

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
}
