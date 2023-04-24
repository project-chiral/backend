import { OpenaiService } from '../api/openai.service'
import { Injectable } from '@nestjs/common'
import {
  SummarizeDescParams,
  SummarizeDescPrompt,
  SummarizeTitlePrompt,
} from './summarize/summarize'
import { EventService } from '../event/event.service'
import { ProjectService } from '../project/project.service'
import { QueryGeneratePrompt } from './query_generate'

@Injectable()
export class AiService {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly eventService: EventService,
    private readonly projectService: ProjectService
  ) {}

  async _BaseParams(id: number) {
    const [{ content }, { lang }] = await Promise.all([
      this.eventService.getContent(id),
      this.projectService.getSettings(),
    ])

    return { doc: content, lang }
  }

  async summarizeTitle(id: number) {
    const baseParams = await this._BaseParams(id)
    const text = await this.openaiService.complete(
      SummarizeTitlePrompt(baseParams),
      { max_tokens: 128 }
    )

    await this.eventService.update(id, {
      name: text,
    })

    return text
  }

  async summarizeDesc(id: number, params: SummarizeDescParams) {
    const baseParams = await this._BaseParams(id)
    const text = await this.openaiService.complete(
      SummarizeDescPrompt({
        ...baseParams,
        ...params,
      }),
      { max_tokens: 1024 }
    )

    return text
  }

  async generateQuery() {
    const event = await this.eventService.getRandom()
    const baseParams = await this._BaseParams(event.id)

    const text = await this.openaiService.complete(
      QueryGeneratePrompt({
        ...baseParams,
      }),
      { max_tokens: 64 }
    )

    return text
  }
}
