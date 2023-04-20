import { Module } from '@nestjs/common'
import { EnvModule } from '@app/env'
import { GraphController } from './graph.controller'
import { GraphService } from './graph.service'

@Module({
  imports: [
    EnvModule,
  ],
  controllers: [GraphController],
  providers: [GraphService],
})
export class GraphModule {}
