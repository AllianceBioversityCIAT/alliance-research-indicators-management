import { Test, TestingModule } from '@nestjs/testing';
import { ViewConfigurationsService } from './view-configurations.service';
import { ConfigModule } from '@nestjs/config';
import { OrmConfigTestModule } from '../../../db/config/mysql/orm-connection-test.module';
import { ViewConfigurationsModule } from './view-configurations.module';
import { NotFoundException } from '@nestjs/common';

describe('ViewConfigurations', () => {
  let service: ViewConfigurationsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
        }),
        OrmConfigTestModule,
        ViewConfigurationsModule,
      ],
      providers: [],
    }).compile();
    service = module.get<ViewConfigurationsService>(ViewConfigurationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should be return an all schemas', () => {
    it('should return a view configuration by section', async () => {
      const result = await service.getSchema();
      expect(result).toBeDefined();
      if (result.data.length > 0) {
        expect(result.data[0].client_element_code).toBeDefined();
        expect(typeof result.data[0].client_element_code).toBe('string');
        expect(result.data[0].roles).toBeDefined();
        expect(typeof result.data[0].roles).toBe('object');
      }
    });
  });

  describe('should be return a view configuration by section', () => {
    it('should return a view configuration by section', async () => {
      const code = '92a8a69b-f606-47f8-9d7c-0c087ea3ea63';
      const result = await service.getSchemaByRootCode(code);
      expect(result).toBeDefined();
      expect(result.data.client_element_code).toBeDefined();
      expect(typeof result.data.client_element_code).toBe('string');
      expect(result.data.roles).toBeDefined();
      expect(typeof result.data.roles).toBe('object');
    });

    it('should return a error', async () => {
      const code = 'wrong-code';
      const result = service.getSchemaByRootCode(code);
      expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
