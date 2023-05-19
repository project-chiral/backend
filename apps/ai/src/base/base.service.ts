import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { LangKey, LangMap } from '../const'
import { ContentType } from '@app/rmq/types'
import { ContentService } from '../content/content.service'
import { CacheService } from '@app/cache'

@Injectable()
export class BaseService {
  constructor(
    private readonly cache: CacheService,
    private readonly contentService: ContentService,
    private readonly prismaService: PrismaService
  ) {}

  private async _getProjectId(type: ContentType, id: number) {
    const filter = {
      where: { id },
      select: { projectId: true },
    }

    switch (type) {
      case 'event':
        return (await this.prismaService.event.findUniqueOrThrow(filter))
          .projectId
      case 'chara':
        return (await this.prismaService.chara.findUniqueOrThrow(filter))
          .projectId
      case 'scene':
        return (await this.prismaService.scene.findUniqueOrThrow(filter))
          .projectId
      case 'worldview':
        return (await this.prismaService.worldview.findUniqueOrThrow(filter))
          .projectId
    }
  }

  async lang(projectId: number) {
    const lang = await this.cache.get<string>(LangKey({ projectId }))

    if (!lang) {
      const { lang } = await this.prismaService.settings.findUniqueOrThrow({
        where: { projectId },
        select: { lang: true },
      })
      await this.cache.setWithExpire(LangKey({ projectId }), lang)
      return LangMap[lang]
    }

    return LangMap[lang]
  }

  async content(type: ContentType, id: number) {
    return this.contentService.get({ type, id })
  }

  async baseParams(type: ContentType, id: number) {
    const projectId = await this._getProjectId(type, id)
    const [{ content: doc }, lang] = await Promise.all([
      this.contentService.get({
        type,
        id,
      }),
      this.lang(projectId),
    ])

    return {
      lang,
      doc,
    }
  }
}
