import { Module } from '@nestjs/common'
import { GraphController } from './graph.controller'
import { GraphService } from '@app/graph'

@Module({
  controllers: [GraphController],
  providers: [GraphService],
})
export class GraphModule {}
