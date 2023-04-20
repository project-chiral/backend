import { Controller, Get } from '@nestjs/common'
import { GraphService } from './graph.service'

@Controller()
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get()
  getHello(): string {
    return this.graphService.getHello()
  }
}
