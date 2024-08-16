import { Test, TestingModule } from '@nestjs/testing';
import { RoleEndpointPermissionsService } from './role-endpoint-permissions.service';

describe('RoleEndpointPermissionsService', () => {
  let service: RoleEndpointPermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleEndpointPermissionsService],
    }).compile();

    service = module.get<RoleEndpointPermissionsService>(
      RoleEndpointPermissionsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
