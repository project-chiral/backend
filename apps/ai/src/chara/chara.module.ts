import { Module } from '@nestjs/common'
import { CharaService } from './chara.service'
import { CharaController } from './chara.controller'
import { BaseModule } from '../base/base.module'

@Module({
  imports: [BaseModule],
  providers: [CharaService],
  exports: [CharaService],
  controllers: [CharaController],
})
export class CharaModule {}
