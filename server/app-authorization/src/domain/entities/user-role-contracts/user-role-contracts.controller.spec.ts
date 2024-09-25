import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleContractsController } from './user-role-contracts.controller';
import { UserRoleContractsService } from './user-role-contracts.service';
import { OrmConfigTestModule } from '../../../db/config/mysql/orm-connection-test.module';

describe('UserRoleContractsController', () => {
  let controller: UserRoleContractsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRoleContractsController],
      providers: [UserRoleContractsService],
      imports: [OrmConfigTestModule],
    }).compile();

    controller = module.get<UserRoleContractsController>(
      UserRoleContractsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
