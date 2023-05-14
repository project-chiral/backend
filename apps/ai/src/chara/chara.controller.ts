import { Controller, Get, Param, Post, Put, Delete } from '@nestjs/common'
import { CharaService } from './chara.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('chara')
@Controller('chara')
export class CharaController {
  constructor(private readonly charaService: CharaService) {}

  @Get(':id')
  get(@Param('id') eventId: number) {
    return this.charaService.get(eventId)
  }

  @Post(':id')
  resolve(@Param('id') eventId: number) {
    return this.charaService.resolve(eventId)
  }

  @Put(':eventId/resolved/:charaId')
  addResolved(
    @Param('eventId') eventId: number,
    @Param('charaId') charaId: number
  ) {
    return this.charaService.addResolved(eventId, charaId)
  }

  @Delete(':eventId/resolved/:charaId')
  removeResolved(
    @Param('eventId') eventId: number,
    @Param('charaId') charaId: number
  ) {
    return this.charaService.removeResolved(eventId, charaId)
  }

  @Delete(':eventId/unresolved/:name')
  removeUnresolved(
    @Param('eventId') eventId: number,
    @Param('name') name: string
  ) {
    return this.charaService.removeUnresolved(eventId, name)
  }
}
