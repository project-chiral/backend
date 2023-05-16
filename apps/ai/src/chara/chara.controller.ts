import { Controller, Get, Param, Post, Delete } from '@nestjs/common'
import { CharaService } from './chara.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('chara')
@Controller('chara')
export class CharaController {
  constructor(private readonly charaService: CharaService) {}

  @Post(':id')
  resolve(@Param('id') eventId: number) {
    return this.charaService.resolve(eventId)
  }

  @Get(':eventId/unresolved')
  getUnresolved(@Param('eventId') eventId: number) {
    return this.charaService.getUnresolved(eventId)
  }

  @Delete(':eventId/unresolved/:name')
  removeUnresolved(
    @Param('eventId') eventId: number,
    @Param('name') name: string
  ) {
    return this.charaService.removeUnresolved(eventId, name)
  }
}
