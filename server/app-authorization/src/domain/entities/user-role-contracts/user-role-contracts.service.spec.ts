import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleContractsService } from './user-role-contracts.service';
import { OrmConfigTestModule } from '../../../db/config/mysql/orm-connection-test.module';

describe('UserRoleContractsService', () => {
  let service: UserRoleContractsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRoleContractsService],
      imports: [OrmConfigTestModule],
    }).compile();

    service = module.get<UserRoleContractsService>(UserRoleContractsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
