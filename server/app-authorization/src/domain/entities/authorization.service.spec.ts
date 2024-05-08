import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthorizationService } from './authorization.service';
import { User } from './users/entities/user.entity';
import { RefreshToken } from './refresh-tokens/entities/refresh-token.entity';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokensService } from './refresh-tokens/refresh-tokens.service';
import { DataSource, Repository } from 'typeorm';
import { CognitoProfileDto } from '../shared/global-dto/cognito-profile.dto';
import { ConfigService } from '@nestjs/config';

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  let userRepository: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secretkey',
          signOptions: { expiresIn: '1d' },
        }),
      ],
      providers: [
        AuthorizationService,
        { provide: ConfigService, useValue: {} },
        {
          provide: DataSource,
          useValue: {
            transaction: jest.fn().mockImplementation((cb) =>
              cb({
                getRepository: jest.fn().mockReturnValue(userRepository),
              }),
            ),
            getRepository: jest.fn().mockReturnValue({
              findOne: jest.fn().mockResolvedValue({
                sec_user_id: 1,
                first_name: 'Test',
                last_name: 'Test',
                email: 'test@test.com',
              }),
              save: jest.fn().mockResolvedValue({}),
            }),
          },
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              sec_user_id: 1,
              first_name: 'Test',
              last_name: 'Test',
              email: 'test@test.com',
            }),
          },
        },
        { provide: RefreshTokensService, useValue: {} },
        {
          provide: getRepositoryToken(RefreshToken),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthorizationService>(AuthorizationService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
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
    });
  });
});
