import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ComponentTypesService } from './component-types.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateComponentTypeDto } from './dto/create-component-type.dto';
import { UpdateComponentTypeDto } from './dto/update-component-type.dto';

@ApiTags('Component Types')
@Controller()
export class ComponentTypesController {
  constructor(private readonly componentTypesService: ComponentTypesService) {}

  @ApiBearerAuth()
  @Get('all')
  findAll() {
    return this.componentTypesService.findAll();
  }

  @ApiBearerAuth()
  @Post()
  create(@Body() createComponentTypeDto: CreateComponentTypeDto) {
    return this.componentTypesService.create(createComponentTypeDto);
  }

  @ApiBearerAuth()
  @Patch('id')
  update(
    @Param('id') id: string,
    @Body() updateComponentTypeDto: UpdateComponentTypeDto,
  ) {
    return this.componentTypesService.update(+id, updateComponentTypeDto);
  }
}
