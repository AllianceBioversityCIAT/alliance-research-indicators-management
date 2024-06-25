import { Body, Controller, Get, Post } from '@nestjs/common';
import { ViewComponentsService } from './view_components.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateViewComponentListDto } from './dto/create-view_component.dto';
import { Roles } from '../../shared/decorators/required-roles.decorator';
import { RolesEnum } from '../../shared/enums/roles.enum';

@Controller()
@ApiTags('View Components')
export class ViewComponentsController {
  constructor(private readonly viewComponentsService: ViewComponentsService) {}

  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.CONTRIBUTOR, RolesEnum.GUEST)
  @Get()
  findAll() {
    return this.viewComponentsService.findAll();
  }

  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @Post()
  create(@Body() createViewComponent: CreateViewComponentListDto) {
    return this.viewComponentsService.create(createViewComponent);
  }
}
