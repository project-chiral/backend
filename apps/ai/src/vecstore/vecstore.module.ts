import { Module } from '@nestjs/common'
import { VecstoreService } from './vecstore.service'
import { CacheService } from '@app/cache'

@Module({
  imports: [],
  providers: [CacheService, VecstoreService],
  exports: [VecstoreService],
})
export class VecstoreModule {}
