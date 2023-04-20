import { Module } from '@nestjs/common'
import { WorldviewService } from './worldview.service'
import { WorldviewController } from './worldview.controller'

@Module({
  controllers: [WorldviewController],
  providers: [WorldviewService],
})
export class WorldviewModule {}
