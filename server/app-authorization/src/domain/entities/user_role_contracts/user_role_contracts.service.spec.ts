import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleContractsService } from './user_role_contracts.service';

describe('UserRoleContractsService', () => {
  let service: UserRoleContractsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRoleContractsService],
    }).compile();

    service = module.get<UserRoleContractsService>(UserRoleContractsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
