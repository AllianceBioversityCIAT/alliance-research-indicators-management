import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { ElementTypesService } from './element-types.service';

describe('ComponentTypesService', () => {
  let service: ElementTypesService;

  const mockDataSource = {
    getRepository: jest.fn().mockReturnValue({
      find: jest.fn().mockResolvedValue([]),
    }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElementTypesService,
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<ElementTypesService>(ElementTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
