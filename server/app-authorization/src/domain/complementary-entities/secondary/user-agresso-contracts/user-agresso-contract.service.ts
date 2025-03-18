import { Injectable } from '@nestjs/common';
import { AlianceMainApp } from '../../../tools/broker/aliance-main.app';
import { User } from '../../../entities/users/entities/user.entity';
import { UserAgressoContract } from './user-agresso-contract.entity';

@Injectable()
export class UserAgressoContractService extends AlianceMainApp {
  constructor() {
    super();
  }

  automaticLinking(user: User): Promise<UserAgressoContract[]> {
    return this.sendToPattern<User, UserAgressoContract[]>(
      'automatic-link-user-to-contract',
      user,
    );
  }
}
