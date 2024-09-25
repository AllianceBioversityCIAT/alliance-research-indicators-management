import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleResultsService } from './user-role-results.service';
import { OrmConfigTestModule } from '../../../db/config/mysql/orm-connection-test.module';

describe('UserRoleResultsService', () => {
  let service: UserRoleResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRoleResultsService],
      imports: [OrmConfigTestModule],
    }).compile();

    service = module.get<UserRoleResultsService>(UserRoleResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
