import { Injectable } from '@nestjs/common'
import { GenerateQueriesDto } from './dto/generate.dto'
import { PrismaService } from 'nestjs-prisma'
import { UtilsService } from '@app/utils'
import { ContentService } from '../content/content.service'
import { BaseService } from '../base/base.service'
import { QueryGeneratePrompt } from './prompt'
import { OpenAI } from 'langchain/llms/openai'

@Injectable()
export class QueryService {
  llm: OpenAI

  constructor(
    private readonly utils: UtilsService,
    private readonly baseService: BaseService,
    private readonly prismaService: PrismaService,
    private readonly contentService: ContentService
  ) {
    this.llm = new OpenAI({ modelName: 'gpt-3.5-turbo' })
  }

  private async _getRandomEventIds(n: number) {
    const projectId = this.utils.getProjectId()
    const count = await this.prismaService.event.count({
      where: { projectId },
    })
    n = Math.min(n, count)

    const result = new Set<number>()
    while (result.size < n) {
      result.add(Math.floor(Math.random() * count))
    }

    return [...result]
  }

  private async _generate(doc: string) {
    const lang = await this.baseService.lang()
    const resp = await this.llm.call(
      QueryGeneratePrompt({
        doc,
        lang,
      })
    )

    return resp
  }

  async generate({ n }: GenerateQueriesDto) {
    const ids = await this._getRandomEventIds(n)
    const contents = (
      await this.contentService.getContents({
        type: 'event',
        ids,
      })
    ).map(({ content }) => content)

    const result = await Promise.all(
      contents.map((content) => this._generate(content))
    )

    return result
  }
}
