import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CognitoProfileDto } from '../shared/global-dto/cognito-profile.dto';
import { User } from './users/entities/user.entity';
import { ServiceResponseDto } from '../shared/global-dto/service-response.dto';
import { ResponseUtils } from '../shared/utils/response.utils';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenDto,
  PayloadDto,
  ResponseAccessTokenDto,
} from '../shared/global-dto/payload.dto';
import { RefreshToken } from './refresh-tokens/entities/refresh-token.entity';
import { RefreshTokensService } from './refresh-tokens/refresh-tokens.service';
import { ENV } from '../shared/utils/env.utils';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly _jwt: JwtService,
    private readonly _refreshTokenService: RefreshTokensService,
  ) {}

  login(
    profileData: CognitoProfileDto,
  ): Promise<ServiceResponseDto<ResponseAccessTokenDto>> {
    const email: string = profileData.email?.trim();
    const access: Promise<AccessTokenDto> = this.dataSource
      .getRepository(User)
      .findOne({
        where: {
          email: email,
          is_active: true,
        },
      })
      .then((user: User) => {
        if (user) {
          const accessToken: string = this.generateToken(user);
          const tokenObj: AccessTokenDto = new AccessTokenDto(
            accessToken,
            user,
          );
          return tokenObj;
        }

        throw new UnauthorizedException(
          `The user ${email} is not authorized to access the application. Please contact the support team.`,
        );
      });

    return access
      .then((access: AccessTokenDto) => {
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
            return new ResponseAccessTokenDto(
              access.access_token,
              refreshToken.refresh_token_code,
            );
          });
      })
      .then((response: ResponseAccessTokenDto) => {
        return ResponseUtils.format({
          status: HttpStatus.OK,
          description: 'User logged is successfully',
          data: response,
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

  refreshToken(
    refreshToken: string,
  ): Promise<ServiceResponseDto<ResponseAccessTokenDto>> {
    const token: Promise<RefreshToken> =
      this._refreshTokenService.validActiveRefreshToken(refreshToken);
    return token.then(({ user }: RefreshToken) => {
      return ResponseUtils.format({
        status: HttpStatus.OK,
        description: 'New access token generated successfully',
        data: new ResponseAccessTokenDto(
          this.generateToken(user),
          refreshToken,
        ),
      });
    });
  }
}
