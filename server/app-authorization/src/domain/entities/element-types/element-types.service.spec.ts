import { Test, TestingModule } from '@nestjs/testing';
import { ElementTypesService } from './element-types.service';
import { OrmConfigTestModule } from '../../../db/config/mysql/orm-connection-test.module';
import { ElementypesModule } from './element-types.module';

describe('ComponentTypesService', () => {
  let service: ElementTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrmConfigTestModule, ElementypesModule],
    }).compile();

    service = module.get<ElementTypesService>(ElementTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
