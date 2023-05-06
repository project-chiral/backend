import { Injectable } from '@nestjs/common'
import {
  SummarizeDescParams,
  SummarizeDescPrompt,
  SummarizeTitlePrompt,
} from './prompt'
import { OpenAI } from 'langchain/llms/openai'
import { BaseService } from '../base/base.service'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class SummarizeService {
  llm: OpenAI

  constructor(
    private readonly baseService: BaseService,
    private readonly prismaService: PrismaService
  ) {
    this.llm = new OpenAI({ modelName: 'gpt-3.5-turbo' })
  }

  async title(eventId: number) {
    const base = await this.baseService.baseParams('event', eventId)
    const resp = await this.llm.call(
      SummarizeTitlePrompt({
        ...base,
      })
    )

    await this.prismaService.event.update({
      where: { id: eventId },
      data: { name: resp },
    })

    return resp
  }

  async desc(eventId: number, params: SummarizeDescParams) {
    const base = await this.baseService.baseParams('event', eventId)
    const resp = await this.llm.call(
      SummarizeDescPrompt({
        ...base,
        ...params,
      })
    )

    await this.prismaService.event.update({
      where: { id: eventId },
      data: { description: resp },
    })

    return resp
  }
}
