import { Global, Module } from '@nestjs/common'
import { UtilsService } from './utils.service'
import { RequestContextModule } from 'nestjs-request-context'

@Global()
@Module({
  imports: [RequestContextModule],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
