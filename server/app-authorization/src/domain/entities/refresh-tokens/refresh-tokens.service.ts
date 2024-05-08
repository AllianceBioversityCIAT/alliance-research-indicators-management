import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, MoreThanOrEqual } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class RefreshTokensService {
  constructor(private readonly dataSource: DataSource) {}

  validActiveRefreshToken(refreshToken: string): Promise<RefreshToken> {
    const resToken: Promise<RefreshToken> = this.dataSource
      .getRepository(RefreshToken)
      .findOne({
        where: {
          refresh_token_code: refreshToken,
          expires_at: MoreThanOrEqual(new Date()),
          is_active: true,
        },
        relations: {
          user: true,
        },
      });

    return resToken.then((token: RefreshToken) => {
      if (!token)
        throw new BadRequestException(
          'The refresh token is invalid or expired',
        );

      return token;
    });
  }
}
