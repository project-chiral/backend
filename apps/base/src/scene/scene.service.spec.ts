import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { SceneService } from './scene.service'

describe('SceneService', () => {
  let service: SceneService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SceneService],
    }).compile()

    service = module.get<SceneService>(SceneService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
