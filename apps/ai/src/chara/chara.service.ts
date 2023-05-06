import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CharaList } from './types'
import { CharaListKey, UnresolvedCharasKey } from './const'
import { UtilsService } from '@app/utils'
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

@Injectable()
export class CharaService {
  llm: OpenAI

  constructor(
    private readonly prismaService: PrismaService,
    private readonly graphService: GraphService,
    private readonly baseService: BaseService,
    private readonly utils: UtilsService,
    private readonly cache: CacheService
  ) {
    this.llm = new OpenAI({ modelName: 'gpt-3.5-turbo', maxTokens: 512 })
  }

  protected async _charaList() {
    const projectId = this.utils.getProjectId()
    const list = await this.cache.get<CharaList>(CharaListKey({ projectId }))
    if (!list) {
      const charas = await this.prismaService.character.findMany({
        where: { projectId },
        select: { id: true, name: true, alias: true },
      })

      const key = CharaListKey({ projectId })

      await this.cache.set(key, charas)
      await this.cache.expire(key, 60 * 5)
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

      options.push({
        id,
        name: targetName,
        ...result,
      })
    }

    return options
  }

  async resolve(eventId: number) {
    const [{ doc, lang }, list] = await Promise.all([
      this.baseService.baseParams('event', eventId),
      this._charaList(),
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

    return { resolved, unresolved }
  }

  private async _handleResolved(eventId: number, ids: number[]) {
    const projectId = this.utils.getProjectId()

    await this.graphService.createRelations(
      projectId,
      ids.map((id) => ({
        type: PARTICIPATED_IN,
        from: id,
        to: eventId,
      }))
    )
  }

  private async _handleUnresolved(
    eventId: number,
    dtos: UnresolvedCharasDto[]
  ) {
    const projectId = this.utils.getProjectId()
    await this.cache.set(UnresolvedCharasKey({ projectId, eventId }), dtos)
  }

  async getResolved(eventId: number) {
    return this.graphService.getRelation({
      type: PARTICIPATED_IN,
      to: eventId,
    })
  }

  async getUnresolved(eventId: number) {
    const projectId = this.utils.getProjectId()

    const resp =
      (await this.cache.get<object[]>(
        UnresolvedCharasKey({
          projectId,
          eventId,
        })
      )) ?? []

    return plainToInstance(UnresolvedCharasDto, resp)
  }

  /**
   * 角色信息更新后将redis中的角色表删除
   */
  @Subscribe('amq.direct', 'entity_update')
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
