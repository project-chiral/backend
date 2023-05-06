import { Module } from '@nestjs/common'
import { GraphController } from './graph.controller'
import { GraphModule as GraphLibModule } from '@app/graph'
@Module({
  imports: [GraphLibModule],
  controllers: [GraphController],
  providers: [],
})
export class GraphModule {}
