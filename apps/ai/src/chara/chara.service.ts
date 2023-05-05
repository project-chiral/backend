import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CharaTable } from './types'
import { CharaTableKey, UnresolvedCharasKey } from './const'
import { UtilsService } from '@app/utils'
import { Subscribe } from '@app/rmq/decorator'
import { EntityUpdateMsg } from '@app/rmq/subscribe'
import { UnresolvedCharasDto } from './dto/unresolved.dto'
import { CacheService } from '@app/cache'

@Injectable()
export class CharaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly utils: UtilsService,
    private readonly cache: CacheService
  ) {}

  protected async _charaTable() {
    const projectId = this.utils.getProjectId()
    const table = await this.cache.get<CharaTable>(CharaTableKey({ projectId }))
    if (!table) {
      const charas = await this.prismaService.character.findMany({
        where: { projectId },
        select: { name: true, alias: true },
      })

      const table: CharaTable = {}
      for (const chara of charas) {
        table[chara.name] = chara.alias
      }

      const key = CharaTableKey({ projectId })

      await this.cache.set(key, table)
      await this.cache.expire(key, 60 * 5)
      return table
    }

    return table
  }

  async resolve(eventId: number) {
    return []
  }

  async getUnresolved(eventId: number) {
    const projectId = this.utils.getProjectId()

    return (
      this.cache.get<UnresolvedCharasDto>(
        UnresolvedCharasKey({
          projectId,
          eventId,
        })
      ) ?? []
    )
  }

  /**
   * 角色信息更新后将redis中的角色表删除
   */
  @Subscribe('amq.direct', 'entity_update')
  protected async handleCharaUpdate({ type, projectId }: EntityUpdateMsg) {
    if (type !== 'chara') {
      return
    }
    await this.cache.del(CharaTableKey({ projectId }))
  }
}
