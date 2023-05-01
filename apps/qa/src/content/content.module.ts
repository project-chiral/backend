import { Module } from '@nestjs/common'
import { ContentService } from './content.service'
import { ContentController } from './content.controller'
import { VecstoreService } from '../vecstore/vecstore.service'
import { UtilsService } from '@app/utils'

@Module({
  imports: [],
  controllers: [ContentController],
  providers: [ContentService, VecstoreService, UtilsService],
})
export class ContentModule {}
