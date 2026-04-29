import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { UserRoleResultsService } from './user-role-results.service';
import { UserRoleResult } from './entities/user-role-result.entity';
import { CurrentUserUtil } from '../../shared/utils/current-user.util';

describe('UserRoleResultsService', () => {
  let service: UserRoleResultsService;

  const mockRepository = {
    metadata: {
      primaryColumns: [{ propertyName: 'sec_user_role_result_id' }],
    },
  } as unknown as Repository<UserRoleResult>;

  const mockDataSource = {
    getRepository: jest.fn().mockReturnValue(mockRepository),
  } as unknown as DataSource;

  const mockCurrentUserUtil = {
    user_id: 1,
    audit: jest.fn().mockReturnValue({}),
  } as unknown as CurrentUserUtil;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRoleResultsService,
        { provide: DataSource, useValue: mockDataSource },
        { provide: CurrentUserUtil, useValue: mockCurrentUserUtil },
      ],
    }).compile();

    service = module.get<UserRoleResultsService>(UserRoleResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
