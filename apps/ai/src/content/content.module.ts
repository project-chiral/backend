import { Module } from '@nestjs/common'
import { ContentService } from './content.service'
import { ContentController } from './content.controller'
import { ScheduleModule } from '@nestjs/schedule'
import { VecstoreModule } from '../vecstore/vecstore.module'

@Module({
  imports: [ScheduleModule.forRoot(), VecstoreModule],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
