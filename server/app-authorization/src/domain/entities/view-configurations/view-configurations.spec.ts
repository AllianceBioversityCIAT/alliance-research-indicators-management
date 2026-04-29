import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ViewConfigurationsService } from './view-configurations.service';
import { RoleFunctionalPermissionsService } from '../role-functional-permissions/role-functional-permissions.service';

describe('ViewConfigurations', () => {
  let service: ViewConfigurationsService;

  const mapRoleTree = (schema: Record<string, unknown>) => ({
    client_element_code: schema.client_element_code,
    roles: {},
    element_type_id: schema.element_type_id,
    is_active: schema.is_active,
    sec_view_configuration_code: schema.sec_view_configuration_code,
    children: ((schema.children as unknown[]) || []).map((c) =>
      mapRoleTree(c as Record<string, unknown>),
    ),
  });

  const mockRoleFunctionalPermissionsService = {
    _mapRoleFunctionalPermission: jest.fn((schema) => mapRoleTree(schema)),
  };

  const mockTreeRepository = {
    findOne: jest.fn(),
    findDescendantsTree: jest.fn(),
    findTrees: jest.fn(),
  };

  const mockDataSource = {
    getTreeRepository: jest.fn().mockReturnValue(mockTreeRepository),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ViewConfigurationsService,
        { provide: DataSource, useValue: mockDataSource },
        {
          provide: RoleFunctionalPermissionsService,
          useValue: mockRoleFunctionalPermissionsService,
        },
      ],
    }).compile();

    service = module.get<ViewConfigurationsService>(ViewConfigurationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSchema', () => {
    it('should return an empty list when no root trees exist', async () => {
      mockTreeRepository.findTrees.mockResolvedValue([]);

      const result = await service.getSchema();

      expect(result.data).toEqual([]);
      expect(mockTreeRepository.findTrees).toHaveBeenCalled();
    });
  });

  describe('getSchemaByRootCode', () => {
    const rootCode = '92a8a69b-f606-47f8-9d7c-0c087ea3ea63';

    it('should return a formatted view configuration when root exists', async () => {
      const parentNode = {
        sec_view_configuration_code: rootCode,
        is_active: true,
        client_element_code: 'client-element',
        element_type_id: 1,
        role_functional_permission_list: [],
        children: [],
      };

      mockTreeRepository.findOne.mockResolvedValue(parentNode);
      mockTreeRepository.findDescendantsTree.mockResolvedValue({
        ...parentNode,
        children: [],
      });

      const result = await service.getSchemaByRootCode(rootCode);

      expect(result.data.client_element_code).toBe('client-element');
      expect(typeof result.data.roles).toBe('object');
    });

    it('should throw NotFoundException for unknown code', async () => {
      mockTreeRepository.findOne.mockResolvedValue(null);

      await expect(service.getSchemaByRootCode('wrong-code')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
