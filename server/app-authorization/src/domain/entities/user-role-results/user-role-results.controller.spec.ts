import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleResultsController } from './user-role-results.controller';
import { UserRoleResultsService } from './user-role-results.service';

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
