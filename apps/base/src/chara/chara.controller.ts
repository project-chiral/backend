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

@ApiTags('chara')
@Controller('chara')
export class CharaController {
  constructor(private readonly charaService: CharaService) {}

  @Post()
  create(@Body() dto: CreateCharaDto) {
    return this.charaService.create(dto)
  }

  @Get()
  getAll() {
    return this.charaService.findAll()
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.charaService.findOne(id)
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
