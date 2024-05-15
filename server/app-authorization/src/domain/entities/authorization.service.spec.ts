import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationService } from './authorization.service';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokensService } from './refresh-tokens/refresh-tokens.service';
import { DataSourceOptions } from 'typeorm';
import { CognitoProfileDto } from '../shared/global-dto/cognito-profile.dto';
import { ConfigModule } from '@nestjs/config';
import { getDataSource } from '../../db/config/mysql/orm.config';
import { dataSourceTarget } from '../../db/config/mysql/enum/data-source-target.enum';
import { HttpStatus, UnauthorizedException } from '@nestjs/common';

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secretkey',
          signOptions: { expiresIn: '1d' },
        }),
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
        }),
        TypeOrmModule.forRoot(
          <DataSourceOptions>getDataSource(dataSourceTarget.TEST, false),
        ),
      ],
      providers: [AuthorizationService, RefreshTokensService],
    }).compile();
    service = module.get<AuthorizationService>(AuthorizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      const profileData: CognitoProfileDto = {
        email: 'test@test.com',
        email_verified: 'true',
        family_name: 'Test',
        given_name: 'Test',
        sub: '',
        identities: '',
        name: 'test',
        username: 'test@test.com',
      };
      process.env.ARIM_JWT_REFRESH_EXPIRES_IN = '1d';
      const result = await service.login(profileData);
      expect(result.data.access_token).toBeDefined();
      expect(typeof result.data.access_token).toBe('string');
      expect(typeof result.data.refresh_token).toBe('string');
      expect(result.description).toBe('User logged is successfully');
      expect(result.status).toBe(HttpStatus.OK);
    });
  });

  describe('', () => {
    it('login when user is not found', async () => {
      const profileData: CognitoProfileDto = {
        email: 'test.wrong@test.com',
        email_verified: 'true',
        family_name: 'Wrong',
        given_name: 'Test',
        sub: '',
        identities: '',
        name: 'test',
        username: 'test.wrong@test.com',
      };
      const result = service.login(profileData);
      expect(result).rejects.toThrow(UnauthorizedException);
    });
  });
});
