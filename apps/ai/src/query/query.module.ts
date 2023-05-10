import { Module } from '@nestjs/common'
import { ContentModule } from '../content/content.module'
import { QueryService } from './query.service'
import { BaseModule } from '../base/base.module'
import { QueryController } from './query.controller';

@Module({
  imports: [ContentModule, BaseModule],
  providers: [QueryService],
  exports: [QueryService],
  controllers: [QueryController],
})
export class QueryModule {}
