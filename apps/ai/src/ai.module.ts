import { Module } from '@nestjs/common'
import { AiController } from './ai.controller'
import { AiService } from './ai.service'
import { EnvModule } from 'libs/env'
import { RmqModule } from 'libs/rmq/rmq.module'
import { AgentModule } from './agent/agent.module'
import { UtilsModule } from '@app/utils'
import { GraphModule } from '@app/graph'
import { PrismaModule } from 'nestjs-prisma'
import { ContentModule } from './content/content.module'
import { CacheModule } from '@app/cache'
import { VecstoreModule } from './vecstore/vecstore.module'
import { ToolsModule } from './tools/tools.module'
import { QueryModule } from './query/query.module'
import { BaseModule } from './base/base.module'
import { CharaModule } from './chara/chara.module'
import { SummarizeModule } from './summarize/summarize.module'

@Module({
  imports: [
    EnvModule,
    RmqModule,
    UtilsModule,
    GraphModule,
    CacheModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    AgentModule,
    ContentModule,
    VecstoreModule,
    ToolsModule,
    QueryModule,
    BaseModule,
    CharaModule,
    SummarizeModule,
  ],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
