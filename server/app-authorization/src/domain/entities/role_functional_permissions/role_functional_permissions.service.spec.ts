import { Test, TestingModule } from '@nestjs/testing';
import { RoleFunctionalPermissionsService } from './role_functional_permissions.service';

describe('RoleFunctionalPermissionsService', () => {
  let service: RoleFunctionalPermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleFunctionalPermissionsService],
    }).compile();

    service = module.get<RoleFunctionalPermissionsService>(
      RoleFunctionalPermissionsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
