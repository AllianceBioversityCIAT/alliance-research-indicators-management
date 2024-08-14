import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleResultsController } from './user_role_results.controller';
import { UserRoleResultsService } from './user_role_results.service';

describe('UserRoleResultsController', () => {
  let controller: UserRoleResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRoleResultsController],
      providers: [UserRoleResultsService],
    }).compile();

    controller = module.get<UserRoleResultsController>(
      UserRoleResultsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
