import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ViewConfigurationsService } from './view-configurations.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateViewConfigurationDto } from './dto/create-view-configuration.dto';

@Controller()
@ApiTags('View Configurations')
export class ViewConfigurationsController {
  constructor(
    private readonly viewConfigurationsService: ViewConfigurationsService,
  ) {}

  @Get('schema/section/:component_code')
  @ApiParam({ name: 'component_code', type: String })
  getSchemaBySection(@Param('component_code') component_code: string) {
    return this.viewConfigurationsService.getSchemaBySection(component_code);
  }

  @Get('schema')
  getSchema() {
    return this.viewConfigurationsService.getSchema();
  }

  @Post('schema')
  @ApiBody({ type: CreateViewConfigurationDto })
  createSchema(@Body() schema: CreateViewConfigurationDto) {
    return this.viewConfigurationsService.createSchema(schema);
  }

  @Patch('schema/:code')
  @ApiParam({ name: 'code', type: String })
  @ApiBody({ type: CreateViewConfigurationDto })
  updateSchema(
    @Body() schema: CreateViewConfigurationDto,
    @Param('code') code: string,
  ) {
    return this.viewConfigurationsService.updateSchema(code, schema);
  }
}
