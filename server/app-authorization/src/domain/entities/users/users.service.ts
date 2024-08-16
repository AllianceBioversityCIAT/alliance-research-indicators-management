import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRolesService } from '../user-roles/user-roles.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ServiceResponseDto } from '../../shared/global-dto/service-response.dto';
import { ResponseUtils } from '../../shared/utils/response.utils';

@Injectable()
export class UsersService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly _userRolesService: UserRolesService,
  ) {}

  async create(newUser: CreateUserDto): Promise<ServiceResponseDto<User>> {
    return this.dataSource
      .transaction(async (manager) => {
        const resUser: User = await manager.getRepository(User).save({
          email: newUser.email,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
        });

        await this._userRolesService._setRoleToUser(
          resUser.sec_user_id,
          newUser.role_id,
          manager,
        );

        return resUser;
      })
      .then((user: User) =>
        ResponseUtils.format({
          status: HttpStatus.CREATED,
          description: `User ${user.email} created successfully`,
          data: user,
        }),
      );
  }

  async findById(id: number): Promise<ServiceResponseDto<User>> {
    return this.dataSource
      .getRepository(User)
      .findOne({
        where: {
          sec_user_id: id,
          is_active: true,
        },
      })
      .then((user: User) =>
        ResponseUtils.format({
          status: HttpStatus.OK,
          description: `User ${user.email} found successfully`,
          data: user,
        }),
      );
  }

  async update(
    id: number,
    updateUser: UpdateUserDto,
  ): Promise<ServiceResponseDto<User>> {
    return this.dataSource
      .getRepository(User)
      .update(id, {
        first_name: updateUser.first_name,
        last_name: updateUser.last_name,
      })
      .then(() => this.findById(id));
  }
}
