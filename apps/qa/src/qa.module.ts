import { Module } from '@nestjs/common'
import { EnvModule } from 'libs/env'
import { RmqModule } from 'libs/rmq/rmq.module'
import { QaController } from './qa.controller'
import { QaService } from './qa.service'
import { AgentModule } from './agent/agent.module'
import { VecstoreService } from './vecstore/vecstore.service'

@Module({
  imports: [EnvModule, RmqModule, AgentModule],
  controllers: [QaController],
  providers: [QaService, VecstoreService],
})
export class QaModule {}
