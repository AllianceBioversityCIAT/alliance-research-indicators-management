import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CognitoProfileDto } from '../shared/global-dto/cognito-profile.dto';
import { User } from './users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenDto,
  PayloadDto,
  ResponseAccessTokenDto,
  ValidJwtResponse,
} from '../shared/global-dto/payload.dto';
import { RefreshToken } from './refresh-tokens/entities/refresh-token.entity';
import { RefreshTokensService } from './refresh-tokens/refresh-tokens.service';
import { ENV } from '../shared/utils/env.utils';
import { RolesEnum } from '../shared/enums/roles.enum';
import { env } from 'process';
import { MessageMicroservice } from '../tools/broker/message.microservice';
import { UsersService } from './users/users.service';
import { UserStatusEnum } from './user-status/enum/user-status.enum';
import { isEmpty } from '../shared/utils/object.utils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly _jwt: JwtService,
    private readonly _refreshTokenService: RefreshTokensService,
    private readonly _messageMicroservice: MessageMicroservice,
    private readonly _usersService: UsersService,
  ) {}

  login(profileData: CognitoProfileDto): Promise<ResponseAccessTokenDto> {
    const email: string = profileData.email?.trim().toLocaleLowerCase();
    const isCgir: boolean = email.includes('@cgiar.org');
    const access: Promise<AccessTokenDto> = this._usersService
      .findUserLogin(email)
      .then(async (user: User) => {
        let tempUser: User = user;
        if (tempUser && tempUser.status_id === UserStatusEnum.PENDING)
          throw new UnauthorizedException('The user is pending to be accepted');
        if (tempUser && tempUser.status_id === UserStatusEnum.REJECTED)
          throw new UnauthorizedException(
            'The user is rejected please contact the support team',
          );
        if (!tempUser && isCgir) {
          tempUser = await this._usersService
            .create({
              email: email,
              first_name: profileData.given_name,
              last_name: profileData.family_name,
              role_id: RolesEnum.CONTRIBUTOR,
            })
            .then(async (data) => {
              /**
               * Inavailable for now, but in the future we can send a welcome email to the user
               * await this._messageMicroservice.welcomeEmail(data);
               */
              return await this._usersService.findById(data.sec_user_id);
            });
        } else if (!tempUser && !isCgir) {
          await this._usersService.create(
            {
              email: email,
              first_name: profileData.given_name,
              last_name: profileData.family_name,
            },
            true,
          );

          throw new UnauthorizedException(
            'Your access is restricted until your user is approved. You will be notified by email.',
          );
        }

        if (tempUser) {
          await this.dataSource
            .getRepository(User)
            .update(
              { sec_user_id: tempUser.sec_user_id },
              { last_login_at: new Date() },
            );
          const accessToken: string = this.generateToken(tempUser);
          const tokenObj: AccessTokenDto = new AccessTokenDto(
            accessToken,
            tempUser,
          );
          return {
            ...tokenObj,
            user: tempUser,
          };
        }

        throw new UnauthorizedException(
          `The user ${email} is not authorized to access the application. Please contact the support team.`,
        );
      });

    return access.then((access: AccessTokenDto) => {
      const { sec_user_id: user_id } = access.user;
      return this.dataSource
        .getRepository(RefreshToken)
        .save({
          created_by: user_id,
          user_id: user_id,
          refresh_token_code: access.refresh_token,
          expires_at: ENV.EXPIRE_DATE,
        })
        .then((refreshToken: RefreshToken) => {
          return {
            ...new ResponseAccessTokenDto(
              access.access_token,
              refreshToken.refresh_token_code,
            ),
            user: access.user,
          };
        });
    });
  }

  private generateToken(user: User): string {
    const payload: PayloadDto = {
      id: user.sec_user_id,
      first_name: user.first_name,
      last_name: user.last_name,
    };
    return this._jwt.sign(payload);
  }

  async refreshToken(refreshToken: string): Promise<ResponseAccessTokenDto> {
    const token: Promise<RefreshToken> =
      this._refreshTokenService.validActiveRefreshToken(refreshToken);
    return token.then(({ user }: RefreshToken) => {
      return new ResponseAccessTokenDto(this.generateToken(user), refreshToken);
    });
  }

  async validJwt(token: string): Promise<ValidJwtResponse> {
    const dataResponse: ValidJwtResponse = {
      isValid: false,
    };
    const tokenType = this.validateTokenType(token);

    if (tokenType) {
      const validationResponse = await this.validation(
        tokenType.client_id,
        tokenType.client_secret,
      );
      return validationResponse;
    } else {
      try {
        const decoded: PayloadDto = this._jwt.verify(token, {
          secret: env.ARIM_JWT_SECRET,
        });
        if (decoded?.id) {
          const user = await this._usersService.findById(decoded.id);
          dataResponse.isValid = !isEmpty(user?.sec_user_id);
          dataResponse.user = user;
        }
        return dataResponse;
      } catch (_error) {
        return dataResponse;
      }
    }
  }

  async validation(
    clientId: string,
    secretKey: string,
    origin?: string,
  ): Promise<ValidJwtResponse> {
    const appSecret = await this._usersService.findAppSecret(clientId);

    if (!appSecret) {
      return {
        isValid: false,
        user: null,
      };
    }

    let valid: boolean = bcrypt.compareSync(
      secretKey,
      appSecret?.app_secret_key,
    );

    if (!valid) {
      return {
        isValid: false,
        user: null,
      };
    }

    const whitelistHosts = appSecret?.hosts?.length ?? 0;

    if (whitelistHosts > 0 && origin) {
      const isOriginWhitelisted = appSecret?.hosts?.some(
        (host) => host === origin,
      );
      if (!isOriginWhitelisted) {
        valid = false;
      }
    }

    const user = await this._usersService.findById(
      appSecret.responsible_user_id,
    );

    return {
      isValid: valid,
      user: user,
    };
  }

  async utilityLogin(userCode: number): Promise<ResponseAccessTokenDto> {
    const user = await this._usersService.findById(userCode);
    const userCognito: CognitoProfileDto = new CognitoProfileDto();
    userCognito.email = user.email;
    userCognito.given_name = user.first_name;
    userCognito.family_name = user.last_name;
    return this.login(userCognito);
  }

  private validateTokenType(
    token: string,
  ): { client_id: string; client_secret: string } | null {
    try {
      const obj = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
      return obj?.client_id && obj?.client_secret ? obj : null;
    } catch {
      return null;
    }
  }
}
