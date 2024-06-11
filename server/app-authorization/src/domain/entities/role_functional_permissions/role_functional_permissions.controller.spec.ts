import { Test, TestingModule } from '@nestjs/testing';
import { RoleFunctionalPermissionsController } from './role_functional_permissions.controller';
import { RoleFunctionalPermissionsService } from './role_functional_permissions.service';

describe('RoleFunctionalPermissionsController', () => {
  let controller: RoleFunctionalPermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleFunctionalPermissionsController],
      providers: [RoleFunctionalPermissionsService],
    }).compile();

    controller = module.get<RoleFunctionalPermissionsController>(
      RoleFunctionalPermissionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
