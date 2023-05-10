import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CharaList } from './types'
import { CharaListKey, ResolvedCharasKey, UnresolvedCharasKey } from './const'
import { Subscribe } from '@app/rmq/decorator'
import { EntityUpdateMsg } from '@app/rmq/subscribe'
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

  private async recognize(doc: string) {
    const resp = await this.llm.call(CharaRecognizePrompt({ doc }))
    return JSON.parse(resp.replace("'", '"')) as string[]
  }

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

    await this.graphService.removeRelation({
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
    await Promise.all([
      this.cache.setWithExpire(
        ResolvedCharasKey({ eventId }),
        ids,
        1000 * 60 * 60 * 24
      ),
      this.graphService.createRelations(
        ids.map((id) => ({
          type: PARTICIPATED_IN,
          from: id,
          to: eventId,
        }))
      ),
    ])
  }

  private async _handleUnresolved(
    eventId: number,
    dtos: UnresolvedCharasDto[]
  ) {
    await this.cache.setWithExpire(
      UnresolvedCharasKey({ eventId }),
      dtos,
      1000 * 60 * 60 * 24
    )
  }

  async getResolved(eventId: number) {
    const ids = await this.cache.get<number[]>(ResolvedCharasKey({ eventId }))

    if (!ids) {
      const ids = (
        await this.graphService.getRelation({
          type: PARTICIPATED_IN,
          to: eventId,
        })
      ).map((r) => +r.end)

      await this.cache.setWithExpire(ResolvedCharasKey({ eventId }), ids)
      return ids
    }

    return ids
  }

  async getUnresolved(eventId: number) {
    const resp =
      (await this.cache.get<object[]>(UnresolvedCharasKey({ eventId }))) ?? []

    return plainToInstance(UnresolvedCharasDto, resp)
  }

  async get(eventId: number) {
    const [resolved, unresolved] = await Promise.all([
      this.getResolved(eventId),
      this.getUnresolved(eventId),
    ])

    return plainToInstance(CharaResolveEntity, { resolved, unresolved })
  }

  async addResolved(eventId: number, charaId: number) {
    const resolved = await this.getResolved(eventId)

    await Promise.all([
      this.cache.setWithExpire(
        ResolvedCharasKey({ eventId }),
        [...resolved, charaId],
        1000 * 60 * 60 * 24
      ),
      this.graphService.createRelation({
        type: PARTICIPATED_IN,
        from: charaId,
        to: eventId,
      }),
    ])
  }

  async removeResolved(eventId: number, charaId: number) {
    const resolved = await this.getResolved(eventId)

    await Promise.all([
      this.cache.setWithExpire(
        ResolvedCharasKey({ eventId }),
        resolved.filter((v) => v !== charaId),
        1000 * 60 * 60 * 24
      ),
      this.graphService.removeRelation({
        type: PARTICIPATED_IN,
        from: charaId,
        to: eventId,
      }),
    ])
  }

  async removeUnresolved(eventId: number, name: string) {
    const unresolved = await this.getUnresolved(eventId)
    await this.cache.setWithExpire(
      UnresolvedCharasKey({ eventId }),
      unresolved.filter((v) => v.name !== name),
      1000 * 60 * 60 * 24
    )
  }

  /**
   * 角色信息更新后将redis中的角色表删除
   */
  @Subscribe('entity_update', 'ai_chara')
  protected async handleCharaUpdate({ type, projectId }: EntityUpdateMsg) {
    if (type !== 'chara') {
      return
    }
    await this.cache.del(CharaListKey({ projectId }))
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
