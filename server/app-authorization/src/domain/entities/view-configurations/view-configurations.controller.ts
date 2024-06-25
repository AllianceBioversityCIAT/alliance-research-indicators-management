import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ViewConfigurationsService } from './view-configurations.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateViewConfigurationDto } from './dto/create-view-configuration.dto';
import { Roles } from '../../shared/decorators/required-roles.decorator';
import { RolesEnum } from '../../shared/enums/roles.enum';

@Controller()
@ApiTags('View Configurations')
export class ViewConfigurationsController {
  constructor(
    private readonly viewConfigurationsService: ViewConfigurationsService,
  ) {}

  @ApiBearerAuth()
  @Get('schema/section/:code')
  @ApiParam({ name: 'code', type: String })
  getSchemaBySection(@Param('code') code: string) {
    return this.viewConfigurationsService.getSchemaByRootCode(code);
  }

  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.CONTRIBUTOR, RolesEnum.GUEST)
  @Get('schema')
  getSchema() {
    return this.viewConfigurationsService.getSchema();
  }

  @ApiBearerAuth()
  @Post('schema')
  @Roles(RolesEnum.ADMIN)
  @ApiBody({ type: CreateViewConfigurationDto })
  createSchema(@Body() schema: CreateViewConfigurationDto) {
    return this.viewConfigurationsService.createSchema(schema);
  }

  @ApiBearerAuth()
  @Patch('schema/:code')
  @Roles(RolesEnum.ADMIN)
  @ApiParam({ name: 'code', type: String })
  @ApiBody({ type: CreateViewConfigurationDto })
  updateSchema(
    @Body() schema: CreateViewConfigurationDto,
    @Param('code') code: string,
  ) {
    return this.viewConfigurationsService.updateSchema(code, schema);
  }
}
