import { Test, TestingModule } from '@nestjs/testing';
import { UserRolesService } from './user-roles.service';
import { OrmConfigTestModule } from '../../../db/config/mysql/orm-connection-test.module';
import { UserRoleContractsService } from '../user-role-contracts/user-role-contracts.service';
import { UserRoleResultsService } from '../user-role-results/user-role-results.service';
import { UserRolesRepository } from './user-roles.repository';

describe('UserRolesService', () => {
  let service: UserRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRolesService,
        UserRoleContractsService,
        UserRoleResultsService,
        UserRolesRepository,
      ],
      imports: [OrmConfigTestModule],
    }).compile();

    service = module.get<UserRolesService>(UserRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
