import { Injectable } from '@nestjs/common'
import { BaseQaDto } from './dto/base-qa.dto'
import { UtilsService } from '@app/utils'
import { PrismaService } from 'nestjs-prisma'
import { CacheService } from '@app/cache'

@Injectable()
export class AiService {
  constructor(
    private readonly utils: UtilsService,
    private readonly prismaService: PrismaService,
    private readonly cache: CacheService
  ) {}

  baseQA({ query }: BaseQaDto) {
    return query
  }
}
