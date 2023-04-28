import { Module } from '@nestjs/common'
import { EnvModule } from 'libs/env'
import { RmqModule } from 'libs/rmq/rmq.module'
import { GraphService } from './graph.service'
import { CypherService } from './cypher/cypher.service'

@Module({
  imports: [EnvModule, RmqModule],
  providers: [GraphService, CypherService],
})
export class GraphModule {}
