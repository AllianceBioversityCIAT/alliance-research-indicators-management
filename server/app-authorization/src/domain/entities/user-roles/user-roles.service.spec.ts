import { Test, TestingModule } from '@nestjs/testing';
import { UserRolesService } from './user-roles.service';
import { UserRolesRepository } from './user-roles.repository';
import { CurrentUserUtil } from '../../shared/utils/current-user.util';

describe('UserRolesService', () => {
  let service: UserRolesService;

  const mockUserRolesRepository = {
    metadata: {
      primaryColumns: [{ propertyName: 'sec_user_role_id' }],
    },
  } as unknown as UserRolesRepository;

  const mockCurrentUserUtil = {
    user_id: 1,
    audit: jest.fn().mockReturnValue({}),
  } as unknown as CurrentUserUtil;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRolesService,
        { provide: UserRolesRepository, useValue: mockUserRolesRepository },
        { provide: CurrentUserUtil, useValue: mockCurrentUserUtil },
      ],
    }).compile();

    service = module.get<UserRolesService>(UserRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
