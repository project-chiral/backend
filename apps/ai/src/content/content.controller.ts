import { Body, Controller, Get, Put, Query } from '@nestjs/common'
import { ContentService } from './content.service'
import { UpdateContentDto } from './dto/update-content.dto'
import { GetContentQueryDto } from './dto/get-content-query.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  get(@Query() query: GetContentQueryDto) {
    return this.contentService.get(query)
  }

  @Put()
  update(@Body() dto: UpdateContentDto) {
    return this.contentService.update(dto)
  }
}
