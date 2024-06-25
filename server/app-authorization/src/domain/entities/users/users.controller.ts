import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../../shared/decorators/required-roles.decorator';
import { RolesEnum } from '../../shared/enums/roles.enum';

@Controller()
@ApiBearerAuth()
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Post()
  @Roles(RolesEnum.ADMIN)
  create(@Body() newUser: CreateUserDto) {
    return this.usersService.create(newUser);
  }

  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.CONTRIBUTOR)
  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  findById(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiParam({ name: 'id', type: 'number' })
  update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return this.usersService.update(+id, updateUser);
  }
}
