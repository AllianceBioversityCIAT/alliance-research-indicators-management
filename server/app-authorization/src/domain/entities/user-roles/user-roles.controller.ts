import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseUtils } from '../../shared/utils/response.utils';

@ApiTags('User Roles')
@Controller()
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Get('user/:id')
  findRolesByUserId(@Param('id') id: string) {
    return this.userRolesService.findRolesByUserId(+id).then((response) =>
      ResponseUtils.format({
        status: HttpStatus.OK,
        description: `Roles found successfully`,
        data: response,
      }),
    );
  }
}
