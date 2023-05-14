import { Module } from '@nestjs/common'
import { AgentService } from './agent.service'
import { ToolsModule } from '../tools/tools.module'

@Module({
  imports: [ToolsModule],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}
