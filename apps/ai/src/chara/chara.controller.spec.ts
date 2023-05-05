import { Test, TestingModule } from '@nestjs/testing';
import { CharaController } from './chara.controller';

describe('CharaController', () => {
  let controller: CharaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharaController],
    }).compile();

    controller = module.get<CharaController>(CharaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
