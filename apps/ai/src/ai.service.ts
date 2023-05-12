import { Injectable } from '@nestjs/common'
import { BaseQaDto } from './dto/base-qa.dto'
import { AgentService } from './agent/agent.service'

@Injectable()
export class AiService {
  constructor(private readonly agent: AgentService) {}

  async baseQA({ query }: BaseQaDto) {
    return this.agent.baseQA(query)
  }
}
