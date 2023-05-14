import { Module } from '@nestjs/common'
import { BaseService } from './base.service'
import { ContentModule } from '../content/content.module'
import { PrismaModule } from 'nestjs-prisma'

@Module({
  imports: [ContentModule, PrismaModule],
  providers: [BaseService],
  exports: [BaseService],
})
export class BaseModule {}
