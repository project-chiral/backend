import { Controller, Get, Param, Post, Delete } from '@nestjs/common'
import { CharaService } from './chara.service'
import { ApiTags } from '@nestjs/swagger'
import { IdParams } from '../dto/id.param'
import { RemoveUnresolvedParams } from './dto/remove-unresolved.param'

@ApiTags('chara')
@Controller('chara')
export class CharaController {
  constructor(private readonly charaService: CharaService) {}

  @Post(':id')
  resolve(@Param() { id }: IdParams) {
    return this.charaService.resolve(id)
  }

  @Get(':id/unresolved')
  getUnresolved(@Param() { id }: IdParams) {
    return this.charaService.getUnresolved(id)
  }

  @Delete(':id/unresolved/:name')
  removeUnresolved(@Param() { id, name }: RemoveUnresolvedParams) {
    return this.charaService.removeUnresolved(id, name)
  }
}
