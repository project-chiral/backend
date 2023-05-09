import { UtilsService } from '@app/utils'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { LangKey } from '../const'
import { EntityType } from '@app/rmq/types'
import { ContentService } from '../content/content.service'
import { CacheService } from '@app/cache'

@Injectable()
export class BaseService {
  constructor(
    private readonly utils: UtilsService,
    private readonly cache: CacheService,
    private readonly contentService: ContentService,
    private readonly prismaService: PrismaService
  ) {}

  async lang() {
    const projectId = this.utils.getProjectId()
    const lang = await this.cache.get<string>(LangKey({ projectId }))

    if (!lang) {
      const { lang } = await this.prismaService.settings.findUniqueOrThrow({
        where: { projectId },
        select: { lang: true },
      })
      await this.cache.set(LangKey({ projectId }), lang)
      return lang
    }

    return lang
  }

  async content(type: EntityType, id: number) {
    return this.contentService.get({ type, id })
  }

  async baseParams(type: EntityType, id: number) {
    const [{ content: doc }, lang] = await Promise.all([
      this.contentService.get({
        type,
        id,
      }),
      this.lang(),
    ])

    return {
      lang,
      doc,
    }
  }
}
