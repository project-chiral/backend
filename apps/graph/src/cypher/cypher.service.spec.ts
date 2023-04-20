import { Test, TestingModule } from '@nestjs/testing';
import { CypherService } from './cypher.service';

describe('CypherService', () => {
  let service: CypherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CypherService],
    }).compile();

    service = module.get<CypherService>(CypherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
