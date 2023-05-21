import { Test, TestingModule } from '@nestjs/testing'
import { TreeController } from './tree.controller'

describe('TreeController', () => {
  let controller: TreeController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreeController],
    }).compile()

    controller = module.get<TreeController>(TreeController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
