import { RmqService } from '@app/rmq/rmq.service'
import { Injectable } from '@nestjs/common'
import { BaseQaDto } from './dto/base-qa.dto'

@Injectable()
export class QaService {
  constructor(private readonly rmqService: RmqService) {}

  async baseQA({ query }: BaseQaDto) {
    return '测试成功'
    // const { answer } = await this.rmqService.request('amq.direct', 'base_qa', {
    //   query,
    // })
    // return answer
  }
}
