import { Test, TestingModule } from '@nestjs/testing';
import { ComponentTypesController } from './component-types.controller';
import { ComponentTypesService } from './component-types.service';

describe('ComponentTypesController', () => {
  let controller: ComponentTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentTypesController],
      providers: [ComponentTypesService],
    }).compile();

    controller = module.get<ComponentTypesController>(ComponentTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
