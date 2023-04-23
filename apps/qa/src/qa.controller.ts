import { Body, Controller, Post } from '@nestjs/common'
import { QaService } from './qa.service'
import { BaseQaDto } from './dto/base-qa.dto'

@Controller()
export class QaController {
  constructor(private readonly qaService: QaService) {}

  @Post('')
  baseQA(@Body() dto: BaseQaDto) {
    return this.qaService.baseQA(dto)
  }
}
