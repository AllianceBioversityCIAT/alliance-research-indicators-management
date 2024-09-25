import { Test, TestingModule } from '@nestjs/testing';
import { UserRolesController } from './user-roles.controller';
import { UserRolesService } from './user-roles.service';
import { OrmConfigTestModule } from '../../../db/config/mysql/orm-connection-test.module';
import { UserRoleContractsService } from '../user-role-contracts/user-role-contracts.service';
import { UserRoleResultsService } from '../user-role-results/user-role-results.service';
import { UserRolesRepository } from './user-roles.repository';

describe('UserRolesController', () => {
  let controller: UserRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRolesController],
      providers: [
        UserRolesService,
        UserRoleContractsService,
        UserRoleResultsService,
        UserRolesRepository,
      ],
      imports: [OrmConfigTestModule],
    }).compile();

    controller = module.get<UserRolesController>(UserRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
