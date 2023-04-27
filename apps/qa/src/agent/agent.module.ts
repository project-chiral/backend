import { Module } from '@nestjs/common'
import { AgentService } from './agent.service'

@Module({
  providers: [AgentService],
})
export class AgentModule {}
