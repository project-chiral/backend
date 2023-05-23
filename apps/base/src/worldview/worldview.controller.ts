import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { WorldviewService } from './worldview.service'
import { CreateWorldviewDto } from './dto/create-worldview.dto'
import { UpdateWorldviewDto } from './dto/update-worldview.dto'
import { UtilsService } from '@app/utils'
import { IdParams } from '../dto/id.param'

@ApiTags('worldview')
@Controller('worldview')
export class WorldviewController {
  constructor(
    private readonly worldviewService: WorldviewService,
    private readonly utils: UtilsService
  ) {}

  @Get()
  getAll() {
    const projectId = this.utils.getProjectId()
    return this.worldviewService.getAll(projectId)
  }

  @Get(':id')
  get(@Param() { id }: IdParams) {
    return this.worldviewService.get(id)
  }

  @Post()
  create(@Body() dto: CreateWorldviewDto) {
    const projectId = this.utils.getProjectId()
    return this.worldviewService.create(projectId, dto)
  }

  @Patch(':id')
  update(@Param() { id }: IdParams, @Body() dto: UpdateWorldviewDto) {
    return this.worldviewService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param() { id }: IdParams) {
    return this.worldviewService.remove(id)
  }
}
