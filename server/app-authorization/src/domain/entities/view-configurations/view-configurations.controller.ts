import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ViewConfigurationsService } from './view-configurations.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get schema by section code' })
  @Get('schema/section/:code')
  @ApiParam({ name: 'code', type: String })
  getSchemaBySection(@Param('code') code: string) {
    return this.viewConfigurationsService.getSchemaByRootCode(code);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all schemas' })
  @Roles(
    RolesEnum.SUP_ADMIN,
    RolesEnum.CONTRIBUTOR,
    RolesEnum.IT_SUPPORT,
    RolesEnum.GLOBAL,
  )
  @Get('schema')
  getSchema() {
    return this.viewConfigurationsService.getSchema();
  }

  @ApiBearerAuth()
  @Post('schema')
  @Roles(RolesEnum.SUP_ADMIN, RolesEnum.IT_SUPPORT)
  @ApiBody({ type: CreateViewConfigurationDto })
  @ApiOperation({ summary: 'Create a schema' })
  createSchema(@Body() schema: CreateViewConfigurationDto) {
    return this.viewConfigurationsService.createSchema(schema);
  }

  @ApiBearerAuth()
  @Patch('schema/:code')
  @Roles(RolesEnum.SUP_ADMIN, RolesEnum.IT_SUPPORT)
  @ApiParam({ name: 'code', type: String })
  @ApiBody({ type: CreateViewConfigurationDto })
  @ApiOperation({ summary: 'Update a schema' })
  updateSchema(
    @Body() schema: CreateViewConfigurationDto,
    @Param('code') code: string,
  ) {
    return this.viewConfigurationsService.updateSchema(code, schema);
  }

  @ApiBearerAuth()
  @Roles(RolesEnum.SUP_ADMIN, RolesEnum.IT_SUPPORT)
  @Delete('schema/:code')
  @ApiOperation({ summary: 'Delete a schema' })
  deleteSchema(@Param('code') code: string) {
    return this.viewConfigurationsService.deleteSchema(code);
  }
}
