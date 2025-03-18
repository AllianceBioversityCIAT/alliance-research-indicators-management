import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleResultsController } from './user-role-results.controller';
import { UserRoleResultsService } from './user-role-results.service';
import { OrmConfigTestModule } from '../../../db/config/mysql/orm-connection-test.module';

describe('UserRoleResultsController', () => {
  let controller: UserRoleResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRoleResultsController],
      providers: [UserRoleResultsService],
      imports: [OrmConfigTestModule],
    }).compile();

    controller = module.get<UserRoleResultsController>(
      UserRoleResultsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
