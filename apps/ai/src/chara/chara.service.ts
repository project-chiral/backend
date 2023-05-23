import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CharaList } from './types'
import { CharaListKey, UnresolvedCharasKey } from './const'
import { Subscribe } from '@app/rmq/decorator'
import { ContentRemoveMsg, ContentUpdateMsg } from '@app/rmq/subscribe'
import { CharaOption, UnresolvedCharasDto } from './dto/unresolved.dto'
import { CacheService } from '@app/cache'
import { GraphService } from '@app/graph'
import { OpenAI } from 'langchain/llms/openai'
import { BaseService } from '../base/base.service'
import { CharaRecognizePrompt } from './prompt'
import levenshtein from 'js-levenshtein'
import { Lang } from '../const'
import { PARTICIPATED_IN } from '@app/graph/schema'
import { plainToInstance } from 'class-transformer'
import { CharaResolveEntity } from './entities/chara-resolve.entity'
import { DAY_MILLISECONDS } from '@app/utils'

@Injectable()
export class CharaService {
  llm: OpenAI

  constructor(
    private readonly prismaService: PrismaService,
    private readonly graphService: GraphService,
    private readonly baseService: BaseService,
    private readonly cache: CacheService
  ) {
    this.llm = new OpenAI({ modelName: 'gpt-3.5-turbo', maxTokens: 512 })
  }

  protected async _charaList(projectId: number) {
    const list = await this.cache.get<CharaList>(CharaListKey({ projectId }))
    if (!list) {
      const charas = await this.prismaService.chara.findMany({
        where: { projectId },
        select: { id: true, name: true, alias: true },
      })
      await this.cache.setWithExpire(CharaListKey({ projectId }), charas)

      return charas
    }

    return list
  }

  /**
   * 实体识别
   */
  private async recognize(doc: string) {
    const resp = await this.llm.call(CharaRecognizePrompt({ doc }))
    return JSON.parse(resp.replace("'", '"')) as string[]
  }

  /**
   * 实体链接
   */
  private link(
    targetName: string,
    list: CharaList,
    lang: string
  ): CharaOption[] | number {
    const options: CharaOption[] = []
    for (const { id, name, alias } of list) {
      let result = { alias: '', score: -1 }
      for (const sourceName of [name, ...alias]) {
        const score = calcScore(lang as Lang, targetName, sourceName)

        // 完全匹配，直接返回id
        if (Math.abs(score - 1) < 1e-6) {
          return id
        }

        if (score > result.score) {
          result = { alias: sourceName, score }
        }
      }

      // 忽略根本就不匹配的结果
      if (result.score < 1e-6) {
        continue
      }
      options.push({
        id,
        name: targetName,
        ...result,
      })
    }

    return options
  }

  async resolve(eventId: number) {
    const { projectId } = await this.prismaService.event.findUniqueOrThrow({
      where: { id: eventId },
      select: { projectId: true },
    })

    const [{ doc, lang }, list] = await Promise.all([
      this.baseService.baseParams('event', eventId),
      this._charaList(projectId),
    ])

    const names = await this.recognize(doc)
    const linked = names.map((name) => ({
      name,
      link: this.link(name, list, lang),
    }))

    const resolved: number[] = []
    const unresolved: UnresolvedCharasDto[] = []
    for (const { name, link } of linked) {
      if (Array.isArray(link)) {
        unresolved.push({ name, options: link })
      } else {
        resolved.push(link)
      }
    }

    await this.graphService.removeRelations({
      type: PARTICIPATED_IN,
      to: eventId,
    })
    await Promise.all([
      this._handleUnresolved(eventId, unresolved),
      this._handleResolved(eventId, resolved),
    ])

    return plainToInstance(CharaResolveEntity, { resolved, unresolved })
  }

  private async _handleResolved(eventId: number, ids: number[]) {
    await this.graphService.createRelationBatch({
      type: PARTICIPATED_IN,
      ids: ids.map((id) => ({
        from: id,
        to: eventId,
      })),
    })
  }

  private async _handleUnresolved(
    eventId: number,
    dtos: UnresolvedCharasDto[]
  ) {
    await this.cache.setWithExpire(
      UnresolvedCharasKey({ eventId }),
      dtos,
      DAY_MILLISECONDS
    )
  }

  async getUnresolved(eventId: number) {
    const resp =
      (await this.cache.get<object[]>(UnresolvedCharasKey({ eventId }))) ?? []

    return plainToInstance(UnresolvedCharasDto, resp)
  }

  async removeUnresolved(eventId: number, name: string) {
    const unresolved = await this.getUnresolved(eventId)

    const filtered = unresolved.filter((v) => v.name !== name)
    if (unresolved.length === filtered.length) {
      return
    }

    await this.cache.setWithExpire(
      UnresolvedCharasKey({ eventId }),
      filtered,
      DAY_MILLISECONDS
    )
  }

  /**
   * 角色信息更新后将角色表缓存失效
   */
  @Subscribe('ai_chara', 'content_update', ['chara'])
  protected async handleCharaUpdate({ projectId }: ContentUpdateMsg) {
    await this.cache.del(CharaListKey({ projectId }))
  }

  @Subscribe('ai_chara', 'content_remove', ['event'])
  protected async handleEventRemove({ ids }: ContentRemoveMsg) {
    const unresolved = ids.map((eventId) => UnresolvedCharasKey({ eventId }))
    await this.cache.del(unresolved)
  }
}

export const LCS = (a: string, b: string): number => {
  const m = a.length
  const n = b.length
  const dp: number[][] = new Array(m + 1)
    .fill(0)
    .map(() => new Array(n + 1).fill(0))
  let max_len = 0
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
        max_len = Math.max(max_len, dp[i][j])
      } else {
        dp[i][j] = 0
      }
    }
  }
  return max_len
}

export const calcScore = (lang: Lang, name: string, exist_name: string) => {
  if (lang === Lang.CN) {
    return LCS(name, exist_name) / Math.max(name.length, exist_name.length)
  }
  if (lang === Lang.EN) {
    return levenshtein(name, exist_name)
  }

  throw new Error(`Unknown lang: ${lang}`)
}
