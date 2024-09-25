import { Test, TestingModule } from '@nestjs/testing';
import { TemplateService } from './template.service';
import { OrmConfigTestModule } from '../../../db/config/mysql/orm-connection-test.module';

describe('TemplateService', () => {
  let service: TemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateService],
      imports: [OrmConfigTestModule],
    }).compile();

    service = module.get<TemplateService>(TemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
