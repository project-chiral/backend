import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { WorldviewController } from './worldview.controller'
import { WorldviewService } from './worldview.service'

describe('WorldviewController', () => {
  let controller: WorldviewController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorldviewController],
      providers: [WorldviewService],
    }).compile()

    controller = module.get<WorldviewController>(WorldviewController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
