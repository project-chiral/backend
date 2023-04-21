import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { SceneController } from './scene.controller'
import { SceneService } from './scene.service'

describe('SceneController', () => {
  let controller: SceneController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SceneController],
      providers: [SceneService],
    }).compile()

    controller = module.get<SceneController>(SceneController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
