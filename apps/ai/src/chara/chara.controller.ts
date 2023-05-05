import { Controller, Get, Param, Post } from '@nestjs/common'
import { CharaService } from './chara.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('chara')
@Controller('chara')
export class CharaController {
  constructor(private readonly charaService: CharaService) {}

  @Post(':id/resolve')
  resolveCharas(@Param('id') eventId: number) {
    return this.charaService.resolve(eventId)
  }

  @Get(':id/unresolved')
  getUnresolvedCharas(@Param('id') eventId: number) {
    return this.charaService.getUnresolved(eventId)
  }
}
