import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ServiceResponseDto } from '../../shared/global-dto/service-response.dto';
import { ElementType } from './entities/element-type.entity';
import { ResponseUtils } from '../../shared/utils/response.utils';
import { CreateComponentTypeDto } from './dto/create-component-type.dto';
import { UpdateComponentTypeDto } from './dto/update-component-type.dto';

@Injectable()
export class ElementTypesService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(): Promise<ServiceResponseDto<ElementType[]>> {
    return this.dataSource
      .getRepository(ElementType)
      .find({
        where: {
          is_active: true,
        },
      })
      .then((componentTypes) =>
        ResponseUtils.format({
          status: HttpStatus.OK,
          description: 'Component types found successfully',
          data: componentTypes,
        }),
      );
  }

  async create(componentType: CreateComponentTypeDto) {
    const newSaves: Partial<ElementType>[] = componentType.name.map(
      (names) => ({ name: names }),
    );
    return this.dataSource
      .getRepository(ElementType)
      .save(newSaves)
      .then((componentType) =>
        ResponseUtils.format({
          status: HttpStatus.CREATED,
          description: 'Component type created successfully',
          data: componentType,
        }),
      );
  }

  async update(id: number, componentType: UpdateComponentTypeDto) {
    return this.dataSource
      .getRepository(ElementType)
      .update(id, {
        name: componentType.name,
        is_active: componentType.is_active,
      })
      .then((componentType) =>
        ResponseUtils.format({
          status: HttpStatus.OK,
          description: 'Component type updated successfully',
          data: componentType,
        }),
      );
  }
}
