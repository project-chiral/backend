import { Global, Module } from '@nestjs/common'
import { EnvModule } from 'libs/env'
import { RmqModule } from 'libs/rmq/rmq.module'
import { GraphService } from './graph.service'
import { CypherService } from './cypher/cypher.service'
import { UtilsModule } from '@app/utils'

@Global()
@Module({
  imports: [EnvModule, RmqModule, UtilsModule],
  providers: [CypherService, GraphService],
  exports: [CypherService, GraphService],
})
export class GraphModule {}
