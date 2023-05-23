import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common'
import { ContentService } from './content.service'
import { UpdateContentDto } from './dto/update-content.dto'
import { GetContentsQueryDto } from './dto/get-content-query.dto'
import { ApiTags } from '@nestjs/swagger'
import { SearchContentQueryDto } from './dto/search-content-query.dto'
import { UtilsService } from '@app/utils'
import { ContentIdParams } from './dto/content-id.param'

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly utils: UtilsService
  ) {}

  @Get('search')
  search(@Query() query: SearchContentQueryDto) {
    const projectId = this.utils.getProjectId()
    return this.contentService.search(projectId, query)
  }

  @Get(':type/:id')
  get(@Param() { type, id }: ContentIdParams) {
    return this.contentService.get(type, id)
  }

  @Get('batch')
  getBatch(@Query() query: GetContentsQueryDto) {
    return this.contentService.getBatch(query)
  }

  @Put()
  update(@Body() dto: UpdateContentDto) {
    return this.contentService.update(dto)
  }
}
