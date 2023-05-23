import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CharaService } from './chara.service'
import { CreateCharaDto } from './dto/create-chara.dto'
import { UpdateCharaDto } from './dto/update-chara.dto'
import { ApiTags } from '@nestjs/swagger'
import { UtilsService } from '@app/utils'
import { IdParams } from '../dto/id.param'

@ApiTags('chara')
@Controller('chara')
export class CharaController {
  constructor(
    private readonly charaService: CharaService,
    private readonly utils: UtilsService
  ) {}

  @Get()
  getAll() {
    const projectId = this.utils.getProjectId()
    return this.charaService.getAll(projectId)
  }

  @Get(':id')
  get(@Param() { id }: IdParams) {
    return this.charaService.get(id)
  }

  @Post()
  create(@Body() dto: CreateCharaDto) {
    const projectId = this.utils.getProjectId()
    return this.charaService.create(projectId, dto)
  }

  @Patch(':id')
  update(@Param() { id }: IdParams, @Body() dto: UpdateCharaDto) {
    return this.charaService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param() { id }: IdParams) {
    return this.charaService.remove(id)
  }

  @Get('search/name/:name')
  searchByName(@Param('name') name: string) {
    return this.charaService.searchByName(name)
  }
}
