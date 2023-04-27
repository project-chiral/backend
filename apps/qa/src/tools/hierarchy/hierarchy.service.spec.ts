import { Test, TestingModule } from '@nestjs/testing';
import { HierarchyService } from './hierarchy.service';

describe('HierarchyService', () => {
  let service: HierarchyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HierarchyService],
    }).compile();

    service = module.get<HierarchyService>(HierarchyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
