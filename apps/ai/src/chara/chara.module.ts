import { Module } from '@nestjs/common'
import { CharaService } from './chara.service'
import { CharaController } from './chara.controller'

@Module({
  imports: [],
  providers: [CharaService],
  exports: [CharaService],
  controllers: [CharaController],
})
export class CharaModule {}
