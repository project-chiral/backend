import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { QaController } from './qa.controller'
import { QaService } from './qa.service'

describe('QaController', () => {
  let qaController: QaController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QaController],
      providers: [QaService],
    }).compile()

    qaController = app.get<QaController>(QaController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(qaController.getHello()).toBe('Hello World!')
    })
  })
})
