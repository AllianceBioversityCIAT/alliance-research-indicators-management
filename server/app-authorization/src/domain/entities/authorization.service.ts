import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
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
import { TemplateService } from '../auxiliary/template/template.service';
import {
  TemplateEnum,
  WelcomeEmailTemplate,
} from '../auxiliary/template/enum/template.enum';
import { env } from 'process';
import { MessageMicroservice } from '../tools/broker/message.microservice';
import { EmailBody } from '../tools/broker/dtos/mailer.dto';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly _jwt: JwtService,
    private readonly _refreshTokenService: RefreshTokensService,
    private readonly _templateService: TemplateService,
    private readonly _messageMicroservice: MessageMicroservice,
    private readonly _usersService: UsersService,
  ) {}

  login(profileData: CognitoProfileDto): Promise<ResponseAccessTokenDto> {
    const email: string = profileData.email?.trim().toLocaleLowerCase();
    const isCgir: boolean = email.includes('@cgiar.org');
    const userRepo: Repository<User> = this.dataSource.getRepository(User);
    const access: Promise<AccessTokenDto> = userRepo
      .findOne({
        where: {
          email: email,
          is_active: true,
        },
      })
      .then(async (user: User) => {
        let tempUser: User = user;
        if (!tempUser && isCgir) {
          tempUser = await this._usersService
            .create({
              email: email,
              first_name: profileData.given_name,
              last_name: profileData.family_name,
              role_id: RolesEnum.CONTRIBUTOR,
            })
            .then(async (data) => {
              await this._templateService
                ._getTemplate<WelcomeEmailTemplate>(
                  TemplateEnum.WELCOME_EMAIL,
                  {
                    client_host: env.ARIM_ALLIANCE_CLI_HOST,
                    first_name: data.first_name,
                    last_name: data.last_name,
                  },
                )
                .then(async (template: string) => {
                  const sendEmail: EmailBody = {
                    message: {
                      socketFile: Buffer.from(template),
                    },
                    subject: 'Welcome to Alliance',
                    to: data.email,
                  };

                  await this._messageMicroservice.sendEmail(sendEmail);
                });
              return data;
            });
        }

        if (tempUser) {
          const accessToken: string = this.generateToken(tempUser);
          const tokenObj: AccessTokenDto = new AccessTokenDto(
            accessToken,
            tempUser,
          );
          return tokenObj;
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
          return new ResponseAccessTokenDto(
            access.access_token,
            refreshToken.refresh_token_code,
          );
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
    try {
      const decoded: PayloadDto = this._jwt.verify(token, {
        secret: env.ARIM_JWT_SECRET,
      });
      if (decoded?.id) {
        dataResponse.isValid = !!decoded?.id;
        dataResponse.user = {
          sec_user_id: decoded.id,
          first_name: decoded.first_name,
          last_name: decoded.last_name,
        };
      }
      return dataResponse;
    } catch (error) {
      return dataResponse;
    }
  }
}
