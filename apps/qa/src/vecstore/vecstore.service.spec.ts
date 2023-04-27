import { Test, TestingModule } from '@nestjs/testing';
import { VecstoreService } from './vecstore.service';

describe('VecstoreService', () => {
  let service: VecstoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VecstoreService],
    }).compile();

    service = module.get<VecstoreService>(VecstoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
