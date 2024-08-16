import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleResultsService } from './user-role-results.service';

describe('UserRoleResultsService', () => {
  let service: UserRoleResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRoleResultsService],
    }).compile();

    service = module.get<UserRoleResultsService>(UserRoleResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
