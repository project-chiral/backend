import { Global, Module } from '@nestjs/common'
import { EnvModule } from 'libs/env'
import { RmqModule } from 'libs/rmq/rmq.module'
import { GraphService } from './graph.service'
import { CypherService } from './cypher/cypher.service'

@Global()
@Module({
  imports: [EnvModule, RmqModule],
  providers: [CypherService, GraphService],
  exports: [CypherService, GraphService],
})
export class GraphModule {}
