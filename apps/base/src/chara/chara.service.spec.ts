import { Test, TestingModule } from '@nestjs/testing'
import { CharaService } from './chara.service'

describe('CharaService', () => {
  let service: CharaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharaService],
    }).compile()

    service = module.get<CharaService>(CharaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
