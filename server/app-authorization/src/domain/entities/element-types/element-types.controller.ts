import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ElementTypesService } from './element-types.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateComponentTypeDto } from './dto/create-component-type.dto';
import { UpdateComponentTypeDto } from './dto/update-component-type.dto';

@ApiTags('Element Types')
@Controller()
export class ElementTypeTypesController {
  constructor(private readonly elementTypesService: ElementTypesService) {}

  @ApiBearerAuth()
  @Get('all')
  findAll() {
    return this.elementTypesService.findAll();
  }

  @ApiBearerAuth()
  @Post()
  create(@Body() createComponentTypeDto: CreateComponentTypeDto) {
    return this.elementTypesService.create(createComponentTypeDto);
  }

  @ApiBearerAuth()
  @Patch('id')
  update(
    @Param('id') id: string,
    @Body() updateComponentTypeDto: UpdateComponentTypeDto,
  ) {
    return this.elementTypesService.update(+id, updateComponentTypeDto);
  }
}
