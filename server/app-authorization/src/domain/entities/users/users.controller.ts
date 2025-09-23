import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
import { ResponseUtils } from '../../shared/utils/response.utils';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from './entities/user.entity';

@Controller()
@ApiBearerAuth()
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a user' })
  @Post()
  @Roles(RolesEnum.SUP_ADMIN)
  create(@Body() newUser: CreateUserDto) {
    return this.usersService.create(newUser).then((response) =>
      ResponseUtils.format({
        status: HttpStatus.CREATED,
        description: `User ${response.email} created successfully`,
        data: response,
      }),
    );
  }

  @ApiBearerAuth()
  @Roles(
    RolesEnum.SUP_ADMIN,
    RolesEnum.IT_SUPPORT,
    RolesEnum.CONTRIBUTOR,
    RolesEnum.GLOBAL,
  )
  @Get(':id(\\d+)')
  @ApiOperation({ summary: 'Find user by id' })
  @ApiParam({ name: 'id', type: 'number' })
  findById(@Param('id') id: string) {
    return this.usersService.findById(+id).then((response) =>
      ResponseUtils.format({
        status: HttpStatus.OK,
        description: `User ${response.email} found successfully`,
        data: response,
      }),
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find current user' })
  @Get('current')
  findCurrentUser() {
    return this.usersService.findCurrentUser().then((response) =>
      ResponseUtils.format({
        status: HttpStatus.OK,
        description: `User ${response.email} found successfully`,
        data: response,
      }),
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user by id' })
  @Roles(RolesEnum.SUP_ADMIN, RolesEnum.IT_SUPPORT)
  @Patch(':id')
  @ApiParam({ name: 'id', type: 'number' })
  update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return this.usersService.update(+id, updateUser).then((response) =>
      ResponseUtils.format({
        status: HttpStatus.OK,
        description: `User ${response.email} found successfully`,
        data: response,
      }),
    );
  }

  @MessagePattern('user/find-by-id')
  async findAgreementById(@Payload() ids: number[]): Promise<User[]> {
    return this.usersService.findByIds(ids);
  }

  @Get('pending')
  @ApiOperation({
    summary: 'Returns all users who are pending to accept or reject',
  })
  async findPendingUser() {
    return this.usersService.getPendingUsers().then((response) =>
      ResponseUtils.format({
        description: 'users successfully found',
        status: HttpStatus.OK,
        data: response,
      }),
    );
  }
}
