import { Controller, Get, Query } from '@nestjs/common';
import { RoleFunctionalPermissionsService } from './role-functional-permissions.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('role-functional-permissions')
export class RoleFunctionalPermissionsController {
  constructor(
    private readonly roleFunctionalPermissionsService: RoleFunctionalPermissionsService,
  ) {}

  @ApiQuery({ name: 'role', required: false })
  @Get()
  getRoleFunctionalPermissions(@Query('role') roleId: string) {
    return this.roleFunctionalPermissionsService.find(+roleId);
  }
}
