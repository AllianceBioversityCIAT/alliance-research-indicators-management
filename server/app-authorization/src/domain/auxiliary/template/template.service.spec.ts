import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { TemplateService } from './template.service';

describe('TemplateService', () => {
  let service: TemplateService;

  const mockDataSource = {
    getRepository: jest.fn().mockReturnValue({
      findOne: jest.fn().mockResolvedValue({ template: '<p>{{name}}</p>' }),
    }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplateService,
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<TemplateService>(TemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
