import { CACHE_MANAGER, Module } from '@nestjs/common'
import { ContentService } from './content.service'
import { ContentController } from './content.controller'
import { VecstoreService } from '../vecstore/vecstore.service'
import { UtilsService } from '@app/utils'
import { redisStore } from 'cache-manager-redis-yet'

@Module({
  imports: [],
  controllers: [ContentController],
  providers: [
    ContentService,
    VecstoreService,
    UtilsService,
    {
      provide: CACHE_MANAGER,
      useFactory: async () =>
        await redisStore({
          url: process.env.REDIS_URL,
          ttl: 0,
        }),
    },
  ],
})
export class ContentModule {}
