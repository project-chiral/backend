import { Injectable } from '@nestjs/common'
import { BaseQaDto } from './dto/base-qa.dto'
import { UtilsService } from '@app/utils'
import { LangKey } from './const'
import { PrismaService } from 'nestjs-prisma'
import { CacheService } from '@app/cache'

@Injectable()
export class AiService {
  constructor(
    private readonly utils: UtilsService,
    private readonly prismaService: PrismaService,
    private readonly cache: CacheService
  ) {}

  async _lang() {
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

  baseQA({ query }: BaseQaDto) {
    return query
  }
}
