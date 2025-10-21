import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRolesService } from '../user-roles/user-roles.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAgressoContractService } from '../../complementary-entities/secondary/user-agresso-contracts/user-agresso-contract.service';
import { UserStatusEnum } from '../user-status/enum/user-status.enum';
import { CurrentUserUtil } from '../../shared/utils/current-user.util';
import { UserRepository } from './repositories/users.repository';
import { UserRole } from '../user-roles/entities/user-role.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly _userRolesService: UserRolesService,
    private readonly _userAgressoContractService: UserAgressoContractService,
    private readonly _currentUser: CurrentUserUtil,
    private readonly mainRepo: UserRepository,
  ) {}

  async findCurrentUser() {
    return this.mainRepo.findOne({
      where: {
        sec_user_id: this._currentUser.user_id,
        status_id: UserStatusEnum.ACCEPTED,
        is_active: true,
        user_role_list: {
          is_active: true,
        },
      },
      relations: {
        user_role_list: {
          role: true,
        },
      },
    });
  }

  async create(
    newUser: CreateUserDto,
    isPending: boolean = false,
  ): Promise<User> {
    return this.dataSource.transaction(async (manager) => {
      const status_id: UserStatusEnum = isPending
        ? UserStatusEnum.PENDING
        : UserStatusEnum.ACCEPTED;
      const resUser: User = await manager.getRepository(User).save({
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        status_id: status_id,
      });

      if (!isPending) {
        await this._userRolesService.create({
          primaryFilterKey: resUser.sec_user_id,
          dataToSave: { role_id: newUser.role_id },
          generalCompareKey: 'role_id',
          manager,
          onlyCreate: true,
        });

        await this._userAgressoContractService.automaticLinking(resUser);
      }

      return resUser;
    });
  }

  async findById(id: number): Promise<User> {
    return this.mainRepo.findUserAndRoles(id);
  }

  async findUserLogin(email: string): Promise<User> {
    const user = await this.mainRepo.findOne({
      where: {
        email: email,
        is_active: true,
      },
    });

    const activeRoles = await this.dataSource.getRepository(UserRole).find({
      where: {
        is_active: true,
        user_id: user.sec_user_id,
      },
      relations: {
        role: true,
      },
    });

    return { ...user, user_role_list: activeRoles };
  }

  async getPendingUsers(): Promise<User[]> {
    return this.mainRepo.find({
      where: {
        status_id: UserStatusEnum.PENDING,
        is_active: true,
      },
    });
  }

  async findAppSecret(appSecretUuid: string) {
    return this.mainRepo.findAppSecret(appSecretUuid);
  }

  async updateUserStatus(
    user_id: number,
    status_id: UserStatusEnum,
    role_id: number,
  ): Promise<User> {
    return this.mainRepo
      .findOne({
        where: {
          sec_user_id: user_id,
          is_active: true,
        },
      })
      .then(async (user) => {
        return this.dataSource.transaction(async (manager) => {
          if (!user) throw new NotFoundException('User to update not found');
          manager.withRepository(this.mainRepo).update(user.sec_user_id, {
            status_id: status_id,
          });
          await this._userRolesService.create({
            primaryFilterKey: user.sec_user_id,
            dataToSave: { role_id: role_id },
            generalCompareKey: 'role_id',
            manager,
            onlyCreate: true,
          });
          return { ...user, status_id: status_id };
        });
      });
  }

  async findByAttribute<K extends keyof User>(
    attribute: K,
    value: User[K],
  ): Promise<User> {
    return this.mainRepo.findOne({
      where: {
        [attribute]: value,
        status_id: UserStatusEnum.ACCEPTED,
        is_active: true,
      },
    });
  }

  async findByIds(ids: number[]): Promise<User[]> {
    return this.mainRepo.find({
      where: {
        sec_user_id: In(ids),
        status_id: UserStatusEnum.ACCEPTED,
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
