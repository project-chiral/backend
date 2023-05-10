import { Injectable } from '@nestjs/common'
import { GenerateQueriesDto } from './dto/generate.dto'
import { PrismaService } from 'nestjs-prisma'
import { ContentService } from '../content/content.service'
import { BaseService } from '../base/base.service'
import { QueryGeneratePrompt } from './prompt'
import { OpenAI } from 'langchain/llms/openai'
import { CacheService } from '@app/cache'
import { EventIdsKey } from './const'
import { Subscribe } from '@app/rmq/decorator'
import { EntityCreateMsg, EntityRemoveMsg } from '@app/rmq/subscribe'

@Injectable()
export class QueryService {
  llm: OpenAI

  constructor(
    private readonly baseService: BaseService,
    private readonly prismaService: PrismaService,
    private readonly contentService: ContentService,
    private readonly cache: CacheService
  ) {
    this.llm = new OpenAI({ modelName: 'gpt-3.5-turbo' })
  }

  private async _getEventIds(projectId: number) {
    const ids = await this.cache.get<number[]>(EventIdsKey({ projectId }))
    if (!ids) {
      const events = await this.prismaService.event.findMany({
        where: { projectId, done: true },
        select: { id: true },
      })
      const ids = events.map(({ id }) => id)
      await this.cache.setWithExpire(
        EventIdsKey({ projectId }),
        ids,
        1000 * 60 * 60 * 24
      )
      return ids
    }

    return ids
  }

  private async _getRandomEventIds(projectId: number, n: number) {
    const ids = await this._getEventIds(projectId)
    const size = Math.min(n, ids.length)

    const result = new Set<number>()
    while (result.size < size) {
      result.add(ids[Math.floor(Math.random() * ids.length)])
    }

    return [...result]
  }

  private async _generate(projectId: number, doc: string) {
    const lang = await this.baseService.lang(projectId)
    const resp = await this.llm.call(
      QueryGeneratePrompt({
        doc,
        lang,
      })
    )

    return resp
  }

  async generate(projectId: number, { n }: GenerateQueriesDto) {
    const ids = await this._getRandomEventIds(projectId, n)
    const contents = (
      await this.contentService.getBatch({
        type: 'event',
        ids,
      })
    ).map(({ content }) => content)

    const result = await Promise.all(
      contents.map((content) => this._generate(projectId, content))
    )

    return result
  }

  @Subscribe('ai_query', 'entity_create', ['event'])
  async handleEventCreate({ projectId }: EntityCreateMsg) {
    await this.cache.del(EventIdsKey({ projectId }))
  }

  @Subscribe('ai_query', 'entity_remove', ['event'])
  async handleEventRemove({ projectId }: EntityRemoveMsg) {
    await this.cache.del(EventIdsKey({ projectId }))
  }
}
