import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() newUser: CreateUserDto) {
    return this.usersService.create(newUser);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  findById(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'number' })
  update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return this.usersService.update(+id, updateUser);
  }
}
