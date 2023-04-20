import { Module } from '@nestjs/common'
import { EnvModule } from 'libs/env'
import { RmqModule } from 'libs/rmq/rmq.module'
import { GraphController } from './graph.controller'
import { GraphService } from './graph.service'

@Module({
  imports: [EnvModule, RmqModule],
  controllers: [GraphController],
  providers: [GraphService],
})
export class GraphModule {}
