import { Controller, Get, Query } from '@nestjs/common'
import { GenerateQueriesDto } from './dto/generate.dto'
import { QueryService } from './query.service'
import { UtilsService } from '@app/utils'

@Controller('query')
export class QueryController {
  constructor(
    private readonly queryService: QueryService,
    private readonly utils: UtilsService
  ) {}

  @Get('query')
  generate(@Query() dto: GenerateQueriesDto) {
    return this.queryService.generate(this.utils.getProjectId(), dto)
  }
}
