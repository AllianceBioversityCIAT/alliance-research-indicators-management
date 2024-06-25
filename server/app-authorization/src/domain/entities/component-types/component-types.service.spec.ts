import { Test, TestingModule } from '@nestjs/testing';
import { ComponentTypesService } from './component-types.service';
import { OrmConfigTestModule } from '../../../db/config/mysql/orm-connection-test.module';
import { ComponentTypesModule } from './component-types.module';

describe('ComponentTypesService', () => {
  let service: ComponentTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrmConfigTestModule, ComponentTypesModule],
    }).compile();

    service = module.get<ComponentTypesService>(ComponentTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
