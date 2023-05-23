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
import { SceneService } from './scene.service'
import { CreateSceneDto } from './dto/create-scene.dto'
import { UpdateSceneDto } from './dto/update-scene.dto'
import { UtilsService } from '@app/utils'
import { IdParams } from '../dto/id.param'

@ApiTags('scene')
@Controller('scene')
export class SceneController {
  constructor(
    private readonly sceneService: SceneService,
    private readonly utils: UtilsService
  ) {}

  @Post()
  create(@Body() dto: CreateSceneDto) {
    return this.sceneService.create(this.utils.getProjectId(), dto)
  }

  @Get(':id')
  get(@Param() { id }: IdParams) {
    return this.sceneService.get(id)
  }

  @Patch(':id')
  update(@Param() { id }: IdParams, @Body() dto: UpdateSceneDto) {
    return this.sceneService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param() { id }: IdParams) {
    return this.sceneService.remove(id)
  }

  @Get('search/name/:name')
  searchByName(@Param('name') name: string) {
    return this.sceneService.searchByName(name)
  }
}
