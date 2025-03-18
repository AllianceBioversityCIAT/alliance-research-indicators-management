import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserRoleContract } from './entities/user-role-contract.entity';
import { BaseServiceSimple } from '../../shared/global-dto/base-service';
import { CurrentUserUtil } from '../../shared/utils/current-user.util';

@Injectable()
export class UserRoleContractsService extends BaseServiceSimple<
  UserRoleContract,
  Repository<UserRoleContract>
> {
  constructor(dataSource: DataSource, currentUserUtil: CurrentUserUtil) {
    super(
      UserRoleContract,
      dataSource.getRepository(UserRoleContract),
      'user_id',
      currentUserUtil,
    );
  }
}
