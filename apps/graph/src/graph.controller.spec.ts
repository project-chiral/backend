import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { GraphController } from './graph.controller'
import { GraphService } from './graph.service'

describe('GraphController', () => {
  let graphController: GraphController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GraphController],
      providers: [GraphService],
    }).compile()

    graphController = app.get<GraphController>(GraphController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(graphController.getHello()).toBe('Hello World!')
    })
  })
})
