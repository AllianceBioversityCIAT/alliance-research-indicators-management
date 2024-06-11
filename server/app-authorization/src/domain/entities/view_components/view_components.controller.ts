import { Controller, Get } from '@nestjs/common';
import { ViewComponentsService } from './view_components.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('View Components')
export class ViewComponentsController {
  constructor(private readonly viewComponentsService: ViewComponentsService) {}

  @Get()
  findAll() {
    return this.viewComponentsService.findAll();
  }
}
