import { Test, TestingModule } from '@nestjs/testing';
import { SummarizeController } from './summarize.controller';

describe('SummarizeController', () => {
  let controller: SummarizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummarizeController],
    }).compile();

    controller = module.get<SummarizeController>(SummarizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
