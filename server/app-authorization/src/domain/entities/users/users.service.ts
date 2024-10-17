import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRolesService } from '../user-roles/user-roles.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAgressoContractService } from '../../complementary-entities/secondary/user-agresso-contracts/user-agresso-contract.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly _userRolesService: UserRolesService,
    private readonly _userAgressoContractService: UserAgressoContractService,
  ) {}

  async create(newUser: CreateUserDto): Promise<User> {
    return this.dataSource.transaction(async (manager) => {
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

      await this._userAgressoContractService.automaticLinking(resUser);

      return resUser;
    });
  }

  async findById(id: number): Promise<User> {
    return this.dataSource.getRepository(User).findOne({
      where: {
        sec_user_id: id,
        is_active: true,
      },
    });
  }

  async findByIds(ids: number[]): Promise<User[]> {
    return this.dataSource.getRepository(User).find({
      where: {
        sec_user_id: In(ids),
        is_active: true,
      },
    });
  }

  async update(id: number, updateUser: UpdateUserDto): Promise<User> {
    return this.dataSource
      .getRepository(User)
      .update(id, {
        first_name: updateUser.first_name,
        last_name: updateUser.last_name,
      })
      .then(() => this.findById(id));
  }
}
