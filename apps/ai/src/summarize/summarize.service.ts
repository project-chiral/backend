import { Injectable } from '@nestjs/common'
import {
  SummarizeDescParams,
  SummarizeDescPrompt,
  SummarizeTitlePrompt,
} from './prompt'
import { OpenAI } from 'langchain/llms/openai'
import { BaseService } from '../base/base.service'
import { ContentService } from '../content/content.service'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class SummarizeService {
  llm: OpenAI

  constructor(
    private readonly baseService: BaseService,
    private readonly prismaService: PrismaService,
    private readonly contentService: ContentService
  ) {
    this.llm = new OpenAI({ modelName: 'gpt-3.5-turbo' })
  }

  async title(id: number) {
    const base = await this.baseService.baseParams('event', id)
    const resp = await this.llm.call(SummarizeTitlePrompt({ ...base }))

    await this.prismaService.event.update({
      where: { id },
      data: { name: resp },
    })

    return resp
  }

  async desc(id: number, params: SummarizeDescParams) {
    const base = await this.baseService.baseParams('event', id)
    const resp = await this.llm.call(
      SummarizeDescPrompt({
        ...base,
        ...params,
      })
    )

    await this.prismaService.event.update({
      where: { id },
      data: { description: resp },
    })

    return resp
  }
}
