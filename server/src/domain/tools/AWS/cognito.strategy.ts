import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import {
  BadRequestException,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { firstValueFrom, map } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ExceptionMessage } from '../../shared/enums/exception-message.enum';
import { AWSutil } from '../../shared/utils/aws.utils';
import { ResponseCognitoDto } from '../../shared/global-dto/cognito-config.dto';
import { CognitoProfileDto } from '../../shared/global-dto/cognito-profile.dto';

@Injectable()
export class CognitoStrategy extends PassportStrategy(Strategy, 'cognito') {
  constructor(
    private readonly _http: HttpService,
    private readonly _configService: ConfigService,
  ) {
    super();
  }

  async validate(@Req() req: Request) {
    const { authorization } = req.headers;
    if (typeof authorization !== 'string') {
      throw new UnauthorizedException();
    }

    const parts = authorization.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException();
    }

    const code = parts[1];

    const config = AWSutil.cognito.config({
      client_id: this._configService.get<string>('COGNITO_CLIENT_ID'),
      client_secret: this._configService.get<string>('COGNITO_CLIENT_SECRET'),
      code: code,
      redirect_uri: this._configService.get<string>('COGNITO_REDIRECT_URI'),
    });

    const accessToken = await this._createToken(config);
    const profileData = await this._getProfileData(accessToken);

    return profileData;
  }

  private _createToken(config: ResponseCognitoDto): Promise<string> {
    return firstValueFrom(
      this._http
        .post(
          `${this._configService.get<string>('COGNITO_LINK')}/oauth2/token`,
          config.body,
          config.headers,
        )
        .pipe(
          map((res: { data: { access_token: string } }) => {
            if (!res?.data?.access_token) {
              throw new UnauthorizedException(
                ExceptionMessage.AWS_AUTHORIZATION_CODE,
              );
            }
            return res.data.access_token;
          }),
        ),
    ).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  private _getProfileData(accessToken: string): Promise<CognitoProfileDto> {
    return firstValueFrom(
      this._http
        .get(
          `${this._configService.get<string>('COGNITO_LINK')}/oauth2/userInfo`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .pipe(
          map((res: { data: CognitoProfileDto }) => {
            if (res?.data) {
              throw new UnauthorizedException(
                ExceptionMessage.AWS_AUTHORIZATION_CODE,
              );
            }
            const { data } = res;
            return data;
          }),
        ),
    ).catch((err) => {
      throw new BadRequestException(err);
    });
  }
}
