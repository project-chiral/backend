import { Test, TestingModule } from '@nestjs/testing'
import { SummarizeService } from './summarize.service'

describe('SummarizeService', () => {
  let service: SummarizeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SummarizeService],
    }).compile()

    service = module.get<SummarizeService>(SummarizeService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
