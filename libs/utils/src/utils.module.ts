import { Module } from '@nestjs/common'
import { UtilsService } from './utils.service'
import { RequestContextModule } from 'nestjs-request-context'

@Module({
  imports: [RequestContextModule],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
