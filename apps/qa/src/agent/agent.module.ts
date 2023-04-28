import { Module } from '@nestjs/common'
import { AgentService } from './agent.service'
import { SemanticService } from '../tools/semantic/semantic.service'
import { VecstoreService } from '../vecstore/vecstore.service'

@Module({
  providers: [AgentService, SemanticService, VecstoreService],
  exports: [AgentService],
})
export class AgentModule {}
