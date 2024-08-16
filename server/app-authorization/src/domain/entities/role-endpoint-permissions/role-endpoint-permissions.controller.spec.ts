import { Test, TestingModule } from '@nestjs/testing';
import { RoleEndpointPermissionsController } from './role-endpoint-permissions.controller';
import { RoleEndpointPermissionsService } from './role-endpoint-permissions.service';

describe('RoleEndpointPermissionsController', () => {
  let controller: RoleEndpointPermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleEndpointPermissionsController],
      providers: [RoleEndpointPermissionsService],
    }).compile();

    controller = module.get<RoleEndpointPermissionsController>(
      RoleEndpointPermissionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
