import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { WorldviewService } from './worldview.service'

describe('WorldviewService', () => {
  let service: WorldviewService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorldviewService],
    }).compile()

    service = module.get<WorldviewService>(WorldviewService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
