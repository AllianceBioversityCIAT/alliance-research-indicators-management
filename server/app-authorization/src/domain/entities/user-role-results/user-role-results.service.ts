import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserRoleResult } from './entities/user-role-result.entity';
import { BaseServiceSimple } from '../../shared/global-dto/base-service';
import { CurrentUserUtil } from '../../shared/utils/current-user.util';

@Injectable()
export class UserRoleResultsService extends BaseServiceSimple<
  UserRoleResult,
  Repository<UserRoleResult>
> {
  constructor(dataSource: DataSource, currentUserUtil: CurrentUserUtil) {
    super(
      UserRoleResult,
      dataSource.getRepository(UserRoleResult),
      'user_id',
      currentUserUtil,
    );
  }
}
