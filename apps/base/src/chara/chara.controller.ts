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

@Controller('chara')
export class CharaController {
  constructor(private readonly charaService: CharaService) {}

  @Post()
  create(@Body() createCharaDto: CreateCharaDto) {
    return this.charaService.create(createCharaDto)
  }

  @Get()
  getAll() {
    return this.charaService.findAll()
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.charaService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCharaDto: UpdateCharaDto) {
    return this.charaService.update(+id, updateCharaDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charaService.remove(+id)
  }
}
