import { Module } from '@nestjs/common'
import { ContentModule } from '../content/content.module'
import { QueryService } from './query.service'
import { BaseModule } from '../base/base.module'

@Module({
  imports: [ContentModule, BaseModule],
  providers: [QueryService],
  exports: [QueryService],
})
export class QueryModule {}
