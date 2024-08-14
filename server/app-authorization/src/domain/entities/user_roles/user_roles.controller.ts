import { Controller, Get, Param } from '@nestjs/common';
import { UserRolesService } from './user_roles.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Roles')
@Controller()
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Get(':id')
  findRolesByUserId(@Param('id') id: string) {
    return this.userRolesService.findRolesByUserId(+id);
  }
}
