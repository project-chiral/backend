import { RmqService } from '@app/rmq/rmq.service'
import { Injectable } from '@nestjs/common'
import { BaseQaDto } from './dto/base-qa.dto'
import { AgentService } from './agent/agent.service'
import { UtilsService } from '@app/utils'

@Injectable()
export class QaService {
  constructor(
    private readonly rmqService: RmqService,
    private readonly agentService: AgentService,
    private readonly utilsService: UtilsService
  ) {}

  async baseQA({ query }: BaseQaDto) {
    const projectId = this.utilsService.getProjectId()
    return '测试成功'
  }
}
