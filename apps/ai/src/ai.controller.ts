import { Body, Controller, Post } from '@nestjs/common'
import { AiService } from './ai.service'
import { BaseQaDto } from './dto/base-qa.dto'

@Controller()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  baseQA(@Body() dto: BaseQaDto) {
    return this.aiService.baseQA(dto)
  }
}
