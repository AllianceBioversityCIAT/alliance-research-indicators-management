import { Test, TestingModule } from '@nestjs/testing';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { OrmConfigTestModule } from '../../../db/config/mysql/orm-connection-test.module';

describe('TemplateController', () => {
  let controller: TemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateController],
      providers: [TemplateService],
      imports: [OrmConfigTestModule],
    }).compile();

    controller = module.get<TemplateController>(TemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
