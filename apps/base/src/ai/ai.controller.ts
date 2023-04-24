import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { AiService } from './ai.service'
import { UnresolvedEntityDto } from './dto/unresolved.dto'
import { SummarizeDescParams } from './summarize/summarize'

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post(':id/summarize/title')
  summarizeTitle(@Param('id') id: number) {
    return this.aiService.summarizeTitle(id)
  }

  @Post(':id/summarize/desc')
  summarizeDesc(@Param('id') id: number, @Body() params: SummarizeDescParams) {
    return this.aiService.summarizeDesc(id, params)
  }

  @Post(':id/entities')
  resolveEntities(@Param('id') id: number) {
    // TODO
    return [] as UnresolvedEntityDto[]
  }

  @Get('query')
  generateQuery() {
    return this.aiService.generateQuery()
  }
}
