import { Test, TestingModule } from '@nestjs/testing'
import { SemanticService } from './semantic.service'

describe('SemanticService', () => {
  let service: SemanticService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SemanticService],
    }).compile()

    service = module.get<SemanticService>(SemanticService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
