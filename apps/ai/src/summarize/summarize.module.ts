import { Module } from '@nestjs/common'
import { SummarizeService } from './summarize.service'
import { BaseModule } from '../base/base.module'
import { SummarizeController } from './summarize.controller'

@Module({
  imports: [BaseModule],
  providers: [SummarizeService],
  controllers: [SummarizeController],
  exports: [SummarizeService],
})
export class SummarizeModule {}
