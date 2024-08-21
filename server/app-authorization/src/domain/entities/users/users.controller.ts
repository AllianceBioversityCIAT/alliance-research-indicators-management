import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../../shared/decorators/required-roles.decorator';
import { RolesEnum } from '../../shared/enums/roles.enum';

@Controller()
@ApiBearerAuth()
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a user' })
  @Post()
  @Roles(RolesEnum.GENERAL_ADMIN)
  create(@Body() newUser: CreateUserDto) {
    return this.usersService.create(newUser);
  }

  @ApiBearerAuth()
  @Roles(
    RolesEnum.GENERAL_ADMIN,
    RolesEnum.IT_SUPPORT,
    RolesEnum.CONTRIBUTOR,
    RolesEnum.GLOBAL,
  )
  @Get(':id')
  @ApiOperation({ summary: 'Find user by id' })
  @ApiParam({ name: 'id', type: 'number' })
  findById(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user by id' })
  @Roles(RolesEnum.GENERAL_ADMIN, RolesEnum.IT_SUPPORT)
  @Patch(':id')
  @ApiParam({ name: 'id', type: 'number' })
  update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return this.usersService.update(+id, updateUser);
  }
}
