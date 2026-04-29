import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { AuthorizationService } from './authorization.service';
import { CognitoProfileDto } from '../shared/global-dto/cognito-profile.dto';
import { UsersService } from './users/users.service';
import { RefreshTokensService } from './refresh-tokens/refresh-tokens.service';
import { MessageMicroservice } from '../tools/broker/message.microservice';
import { User } from './users/entities/user.entity';
import { UserStatusEnum } from './user-status/enum/user-status.enum';
import { RefreshToken } from './refresh-tokens/entities/refresh-token.entity';

describe('AuthorizationService', () => {
  let service: AuthorizationService;

  const mockUsersService = {
    findUserLogin: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
  };

  const mockUserRepo = {
    update: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  const mockRefreshRepo = {
    save: jest.fn().mockResolvedValue({
      refresh_token_code: 'stored-refresh-token',
    } as RefreshToken),
  };

  const mockDataSource = {
    getRepository: jest.fn().mockImplementation((entity) => {
      if (entity === User) {
        return mockUserRepo;
      }
      if (entity === RefreshToken) {
        return mockRefreshRepo;
      }
      return { update: jest.fn(), save: jest.fn() };
    }),
  };

  const mockJwt = {
    sign: jest.fn().mockReturnValue('signed-access-token'),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    process.env.ARIM_JWT_REFRESH_EXPIRES_IN = '1d';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorizationService,
        { provide: DataSource, useValue: mockDataSource },
        { provide: JwtService, useValue: mockJwt },
        { provide: RefreshTokensService, useValue: {} },
        { provide: MessageMicroservice, useValue: {} },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<AuthorizationService>(AuthorizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return tokens when user exists and is accepted', async () => {
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

      const acceptedUser = {
        sec_user_id: 1,
        email: 'test@test.com',
        status_id: UserStatusEnum.ACCEPTED,
        first_name: 'Test',
        last_name: 'Test',
        user_role_list: [],
      } as User;

      mockUsersService.findUserLogin.mockResolvedValue(acceptedUser);

      const result = await service.login(profileData);

      expect(result.access_token).toBe('signed-access-token');
      expect(typeof result.refresh_token).toBe('string');
      expect(mockJwt.sign).toHaveBeenCalled();
      expect(mockUserRepo.update).toHaveBeenCalled();
      expect(mockRefreshRepo.save).toHaveBeenCalled();
    });

    it('should reject when user is not found and email is not cgiar.org', async () => {
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

      mockUsersService.findUserLogin.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue({ sec_user_id: 99 });

      await expect(service.login(profileData)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockUsersService.create).toHaveBeenCalled();
    });
  });
});
