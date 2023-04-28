import { Module } from '@nestjs/common'
import { GraphController } from './graph.controller'
import { GraphService } from '@app/graph'
import { CypherService } from '@app/graph/cypher/cypher.service'

@Module({
  controllers: [GraphController],
  providers: [GraphService, CypherService],
})
export class GraphModule {}
