import { Module } from '@nestjs/common'
import { SummarizeService } from './summarize.service'
import { BaseModule } from '../base/base.module'
import { SummarizeController } from './summarize.controller'
import { ContentModule } from '../content/content.module'

@Module({
  imports: [BaseModule, ContentModule],
  providers: [SummarizeService],
  controllers: [SummarizeController],
  exports: [SummarizeService],
})
export class SummarizeModule {}
