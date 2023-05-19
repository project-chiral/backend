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

  @Get('comp')
  comp(@Query() dto: GenerateQueriesDto) {
    return this.queryService.comp(this.utils.getProjectId(), dto)
  }

  @Get('mcq')
  mcq(@Query() dto: GenerateQueriesDto) {
    return this.queryService.mcq(this.utils.getProjectId(), dto)
  }
}
