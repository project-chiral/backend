import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { CharaController } from './chara.controller'
import { CharaService } from './chara.service'

describe('CharaController', () => {
  let controller: CharaController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharaController],
      providers: [CharaService],
    }).compile()

    controller = module.get<CharaController>(CharaController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
