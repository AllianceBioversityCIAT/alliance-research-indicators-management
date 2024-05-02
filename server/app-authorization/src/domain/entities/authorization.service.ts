import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CognitoProfileDto } from '../shared/global-dto/cognito-profile.dto';
import { User } from './users/entities/user.entity';
import * as ActiveDirectory from 'activedirectory';
import { ServiceResponseDto } from '../shared/global-dto/service-response.dto';
import { ResponseUtils } from '../shared/utils/response.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly _configService: ConfigService,
  ) {}

  login(profileData: CognitoProfileDto): Promise<ServiceResponseDto<any>> {
    const email: string = profileData.email?.trim();
    return this.dataSource
      .getRepository(User)
      .findOne({
        where: {
          email: email,
          is_active: true,
        },
      })
      .then(() => {
        return this.validateDirectoryActive(email).then((res) => {
          return res;
        });
      })
      .then((user: User) => {
        return ResponseUtils.format({
          status: HttpStatus.OK,
          data: user,
          description: 'User authenticated successfully',
        });
      });
  }

  //TODO: review this method
  private async validateDirectoryActive(email: string) {
    const ad = new ActiveDirectory({
      url: this._configService.get<string>('ARIM_AD_URL'),
      baseDN: this._configService.get<string>('ARIM_AD_BASEDN'),
      username: this._configService.get<string>('ARIM_AD_DOMAIN'),
    });
    const user = new Promise((resolve, reject) => {
      ad.findUser(email, (err, user) => {
        if (err || !user) {
          console.log(err);
          reject(
            new UnauthorizedException(
              `The user ${email} is not authorized to access the application. Please contact the support team.`,
            ),
          );
        }

        if (user) {
          resolve(user);
        }
      });
    })
      .then((user: User) => {
        return user;
      })
      .catch((error: UnauthorizedException) => {
        throw error;
      });

    return user;
  }
}
