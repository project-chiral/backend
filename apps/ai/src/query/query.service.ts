import { Injectable } from '@nestjs/common'
import { GenerateQueriesDto } from './dto/generate.dto'
import { PrismaService } from 'nestjs-prisma'
import { ContentService } from '../content/content.service'
import { BaseService } from '../base/base.service'
import { MCQPrompt, CompPrompt } from './prompt'
import { OpenAI } from 'langchain/llms/openai'
import { CacheService } from '@app/cache'
import { DoneEventIdsKey } from './const'
import { Subscribe } from '@app/rmq/decorator'
import { ContentDoneMsg } from '@app/rmq/subscribe'
import { DAY_MILLISECONDS } from '@app/utils'
import { BaseParams } from '../dto/base-params.dto'

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

  private async _getDoneEventIds(projectId: number) {
    const ids = await this.cache.get<number[]>(DoneEventIdsKey({ projectId }))
    if (!ids) {
      const events = await this.prismaService.event.findMany({
        where: { projectId, done: true },
        select: { id: true },
      })
      const ids = events.map(({ id }) => id)
      await this.cache.setWithExpire(
        DoneEventIdsKey({ projectId }),
        ids,
        DAY_MILLISECONDS
      )
      return ids
    }

    return ids
  }

  private async _getRandomEventIds(projectId: number, n: number) {
    const ids = await this._getDoneEventIds(projectId)
    const size = Math.min(n, ids.length)

    const result = new Set<number>()
    while (result.size < size) {
      result.add(ids[Math.floor(Math.random() * ids.length)])
    }

    return [...result]
  }

  private async _generate(
    projectId: number,
    n: number,
    prompt: (params: BaseParams) => string
  ) {
    const ids = await this._getRandomEventIds(projectId, n)
    const lang = await this.baseService.lang(projectId)

    const contents = (
      await this.contentService.getBatch({
        type: 'event',
        ids,
      })
    ).map(({ content }) => content)

    const result = await Promise.all(
      contents.map(async (doc) => {
        return await this.llm.call(
          prompt({
            doc,
            lang,
          })
        )
      })
    )

    return result
  }

  async comp(projectId: number, { n }: GenerateQueriesDto) {
    return this._generate(projectId, n, CompPrompt)
  }

  async mcq(projectId: number, { n }: GenerateQueriesDto) {
    return this._generate(projectId, n, MCQPrompt)
  }

  @Subscribe('ai_query', 'content_done', ['content'])
  async handleEventDone({ projectId, ids, done }: ContentDoneMsg) {
    const doneIds = await this._getDoneEventIds(projectId)
    if (done) {
      await this.cache.setWithExpire(
        DoneEventIdsKey({ projectId }),
        [...new Set([...doneIds, ...ids])],
        DAY_MILLISECONDS
      )
    } else {
      const idsSet = new Set(ids)
      await this.cache.setWithExpire(
        DoneEventIdsKey({ projectId }),
        doneIds.filter((id) => !idsSet.has(id)),
        DAY_MILLISECONDS
      )
    }
  }
}
