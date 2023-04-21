import { Controller, Get } from '@nestjs/common'
import { QaService } from './qa.service'

@Controller()
export class QaController {
  constructor(private readonly qaService: QaService) {}

  @Get()
  baseQA() {
    return ''
  }

  @Get('test')
  getTest() {
    return 'test'
  }
}
