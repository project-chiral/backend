import { Module } from '@nestjs/common'
import { CharaService } from './chara.service'
import { CharaController } from './chara.controller'

@Module({
  controllers: [CharaController],
  providers: [CharaService],
})
export class CharaModule {}
