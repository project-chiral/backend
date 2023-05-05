import { Injectable } from '@nestjs/common'
import {
  SummarizeDescParams,
  SummarizeDescPrompt,
  SummarizeTitlePrompt,
} from './prompt'
import { OpenAI } from 'langchain/llms/openai'
import { BaseService } from '../base/base.service'

@Injectable()
export class SummarizeService {
  llm: OpenAI

  constructor(private readonly baseService: BaseService) {
    this.llm = new OpenAI({ modelName: 'gpt-3.5-turbo' })
  }

  async title(eventId: number) {
    const base = await this.baseService.baseParams('event', eventId)
    const resp = await this.llm.call(
      SummarizeTitlePrompt({
        ...base,
      })
    )
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
    return resp
  }
}
