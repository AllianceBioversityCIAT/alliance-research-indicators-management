import { v4 as uuidv4 } from 'uuid';
import { User } from '../../entities/users/entities/user.entity';
import { UserRole } from '../../entities/user_roles/entities/user_role.entity';

export class PayloadDto {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public roles?: UserRole[],
  ) {}
}

export class AccessTokenDto {
  public refresh_token: string;
  constructor(
    public access_token: string,
    public user: User,
  ) {
    this.refresh_token = uuidv4();
  }
}

export class ResponseAccessTokenDto {
  constructor(
    public access_token: string,
    public refresh_token: string,
  ) {}
}
