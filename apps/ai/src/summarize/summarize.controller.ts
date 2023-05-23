import { Body, Controller, Param, Post } from '@nestjs/common'
import { SummarizeDescParams } from './prompt'
import { SummarizeService } from './summarize.service'
import { ApiTags } from '@nestjs/swagger'
import { IdParams } from '../dto/id.param'

@ApiTags('summarize')
@Controller('summarize')
export class SummarizeController {
  constructor(private readonly summarizeService: SummarizeService) {}
  @Post(':id/title')
  title(@Param() { id }: IdParams) {
    return this.summarizeService.title(id)
  }

  @Post(':id/desc')
  desc(@Param() { id }: IdParams, @Body() params: SummarizeDescParams) {
    return this.summarizeService.desc(id, params)
  }
}
