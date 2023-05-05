import { Body, Controller, Param, Post } from '@nestjs/common'
import { SummarizeDescParams } from './prompt'
import { SummarizeService } from './summarize.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('summarize')
@Controller('summarize')
export class SummarizeController {
  constructor(private readonly summarizeService: SummarizeService) {}
  @Post(':id/title')
  summarizeTitle(@Param('id') eventId: number) {
    return this.summarizeService.title(eventId)
  }

  @Post(':id/desc')
  summarizeDesc(
    @Param('id') eventId: number,
    @Body() params: SummarizeDescParams
  ) {
    return this.summarizeService.desc(eventId, params)
  }
}
