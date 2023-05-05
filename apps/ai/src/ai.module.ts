import { Module } from '@nestjs/common'
import { AiController } from './ai.controller'
import { AiService } from './ai.service'
import { EnvModule } from 'libs/env'
import { RmqModule } from 'libs/rmq/rmq.module'
import { AgentModule } from './agent/agent.module'
import { VecstoreService } from './vecstore/vecstore.service'
import { UtilsModule } from '@app/utils'
import { SemanticService } from './tools/semantic/semantic.service'
import { GraphModule, GraphService } from '@app/graph'
import { PrismaModule, PrismaService } from 'nestjs-prisma'
import { ContentModule } from './content/content.module'

@Module({
  imports: [
    EnvModule,
    RmqModule,
    AgentModule,
    UtilsModule,
    GraphModule,
    PrismaModule,
    ContentModule,
  ],
  controllers: [AiController],
  providers: [
    AiService,
    GraphService,
    VecstoreService,
    SemanticService,
    PrismaService,
  ],
})
export class AiModule {}
