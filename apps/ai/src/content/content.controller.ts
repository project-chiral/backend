import { Body, Controller, Get, Put, Query } from '@nestjs/common'
import { ContentService } from './content.service'
import { UpdateContentDto } from './dto/update-content.dto'
import {
  GetContentQueryDto,
  GetContentsQueryDto,
} from './dto/get-content-query.dto'
import { ApiTags } from '@nestjs/swagger'
import { SearchContentQueryDto } from './dto/search-content-query.dto'
import { UtilsService } from '@app/utils'

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly utils: UtilsService
  ) {}

  @Get()
  get(@Query() query: GetContentQueryDto) {
    return this.contentService.get(query)
  }

  @Get('batch')
  getBatch(@Query() query: GetContentsQueryDto) {
    return this.contentService.getBatch(query)
  }

  @Get('search')
  search(@Query() query: SearchContentQueryDto) {
    const projectId = this.utils.getProjectId()
    return this.contentService.search(projectId, query)
  }

  @Put()
  update(@Body() dto: UpdateContentDto) {
    return this.contentService.update(dto)
  }
}
