import { CacheModule, Module } from '@nestjs/common'
import { EnvModule } from 'libs/env'
import { RmqModule } from 'libs/rmq/rmq.module'
import { QaController } from './qa.controller'
import { QaService } from './qa.service'
import { AgentModule } from './agent/agent.module'
import { VecstoreService } from './vecstore/vecstore.service'
import { UtilsModule } from '@app/utils'
import { SemanticService } from './tools/semantic/semantic.service'
import { GraphModule, GraphService } from '@app/graph'
import { PrismaModule, PrismaService } from 'nestjs-prisma'
import { ContentModule } from './content/content.module'
import { redisStore } from 'cache-manager-redis-yet'

@Module({
  imports: [
    EnvModule,
    RmqModule,
    AgentModule,
    UtilsModule,
    GraphModule,
    PrismaModule,
    ContentModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          url: process.env.REDIS_URL,
        }),
      }),
    }),
  ],
  controllers: [QaController],
  providers: [
    QaService,
    GraphService,
    VecstoreService,
    SemanticService,
    PrismaService,
  ],
})
export class QaModule {}
