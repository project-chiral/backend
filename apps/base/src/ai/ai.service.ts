import { OpenaiService } from '../api/openai.service'
import { Injectable } from '@nestjs/common'
import {
  SummarizeDescParams,
  SummarizeDescPrompt,
  SummarizeTitlePrompt,
} from './summarize/summarize'
import { EventService } from '../event/event.service'
import { ProjectService } from '../project/project.service'

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
    const {
      data: {
        choices: [{ text }],
      },
    } = await this.openaiService.createCompletion({
      model: 'gpt-3.5-turbo',
      prompt: SummarizeTitlePrompt(baseParams),
      max_tokens: 128,
      temperature: 0.7,
      n: 1,
    })

    await this.eventService.update(id, {
      name: text,
    })

    return text
  }

  async summarizeDesc(id: number, params: SummarizeDescParams) {
    const baseParams = await this._BaseParams(id)
    const {
      data: {
        choices: [{ text }],
      },
    } = await this.openaiService.createCompletion({
      model: 'gpt-3.5-turbo',
      prompt: SummarizeDescPrompt({
        ...baseParams,
        ...params,
      }),
      max_tokens: 2048,
      temperature: 0.7,
      n: 1,
    })

    await this.eventService.update(id, {
      description: text,
    })

    return text
  }
}
