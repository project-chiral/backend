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

@ApiTags('chara')
@Controller('chara')
export class CharaController {
  constructor(
    private readonly charaService: CharaService,
    private readonly utils: UtilsService
  ) {}

  @Post()
  create(@Body() dto: CreateCharaDto) {
    return this.charaService.create(this.utils.getProjectId(), dto)
  }

  @Get()
  getAll() {
    return this.charaService.getAll(this.utils.getProjectId())
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.charaService.get(id)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateCharaDto) {
    return this.charaService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.charaService.remove(id)
  }

  @Get('search/name/:name')
  searchByName(@Param('name') name: string) {
    return this.charaService.searchByName(name)
  }
}
