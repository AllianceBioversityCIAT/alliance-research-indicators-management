import { Controller, Get, Param } from '@nestjs/common';
import { ViewConfigurationsService } from './view-configurations.service';
import { ApiParam } from '@nestjs/swagger';

@Controller()
export class ViewConfigurationsController {
  constructor(
    private readonly viewConfigurationsService: ViewConfigurationsService,
  ) {}

  @Get('schema/:component_code')
  @ApiParam({ name: 'component_code', type: String })
  getSchema(@Param('component_code') component_code: string) {
    return this.viewConfigurationsService.getSchemaBySection(component_code);
  }
}
