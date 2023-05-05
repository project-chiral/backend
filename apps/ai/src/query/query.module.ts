import { Module } from '@nestjs/common'
import { ContentModule } from '../content/content.module'
import { QueryService } from './query.service'
import { BaseModule } from '../base/base.module'
import { PrismaModule } from 'nestjs-prisma'

@Module({
  imports: [ContentModule, BaseModule, PrismaModule],
  providers: [QueryService],
  exports: [QueryService],
})
export class QueryModule {}
