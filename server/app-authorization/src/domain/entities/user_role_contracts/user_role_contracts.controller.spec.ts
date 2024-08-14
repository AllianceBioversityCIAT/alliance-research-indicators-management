import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleContractsController } from './user_role_contracts.controller';
import { UserRoleContractsService } from './user_role_contracts.service';

describe('UserRoleContractsController', () => {
  let controller: UserRoleContractsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRoleContractsController],
      providers: [UserRoleContractsService],
    }).compile();

    controller = module.get<UserRoleContractsController>(
      UserRoleContractsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
