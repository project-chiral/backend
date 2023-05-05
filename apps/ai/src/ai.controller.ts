import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { AiService } from './ai.service'
import { BaseQaDto } from './dto/base-qa.dto'
import { QueryService } from './query/query.service'
import { GenerateQueriesDto } from './query/dto/generate.dto'

@Controller()
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly queryService: QueryService
  ) {}

  @Post()
  baseQA(@Body() dto: BaseQaDto) {
    return this.aiService.baseQA(dto)
  }

  @Get('query')
  generateQuery(@Query() dto: GenerateQueriesDto) {
    return this.queryService.generate(dto)
  }
}
