import { Injectable, NotFoundException } from '@nestjs/common'
import { VecstoreService } from '../vecstore/vecstore.service'
import { UpdateContentDto } from './dto/update-content.dto'
import { GetContentsQueryDto } from './dto/get-content-query.dto'
import { Subscribe } from '@app/rmq/decorator'
import { ContentDoneMsg, ContentRemoveMsg } from '@app/rmq/subscribe'
import { ContentEntity } from './entities/content.entity'
import { ContentKey } from './const'
import { SchedulerRegistry } from '@nestjs/schedule'
import { plainToInstance } from 'class-transformer'
import { CacheService } from '@app/cache'
import { SearchContentQueryDto } from './dto/search-content-query.dto'
import { PartitionEnum } from '../vecstore/schema'
import { DAY_MILLISECONDS } from '@app/utils'
import { ContentType } from '@app/rmq/types'

@Injectable()
export class ContentService {
  constructor(
    private readonly vecstoreService: VecstoreService,
    private readonly schedule: SchedulerRegistry,
    private readonly cache: CacheService
  ) {}

  async get(type: ContentType, id: number) {
    const key = ContentKey({
      type,
      id,
    })
    const content = await this.cache.get(key)
    if (!content) {
      const query = await this.vecstoreService.query(
        { collection_name: type },
        { id: [id] }
      )
      if (query.length === 0) {
        throw new NotFoundException()
      }

      const [doc] = query
      const content = ContentEntity.fromDoc(type, doc)
      await this.cache.set(key, content)
      return content
    }

    return plainToInstance(ContentEntity, content)
  }

  async getBatch({ type, ids }: GetContentsQueryDto) {
    return Promise.all(ids.map((id) => this.get(type, id)))
  }

  async search(projectId: number, { type, query, k }: SearchContentQueryDto) {
    const result = await this.vecstoreService.simSearch(
      type,
      { query, projectId },
      k
    )

    return result.map(([doc]) => ContentEntity.fromDoc(type, doc))
  }

  async update({ type, id, ...data }: UpdateContentDto) {
    const content = await this.get(type, id)
    const result = plainToInstance(ContentEntity, {
      ...content,
      ...data,
      updateAt: new Date(),
    })

    const key = ContentKey({
      type,
      id,
    })
    await this.cache.set(key, result)

    // 在redis数据超时前先将其保存到milvus中
    if (this.schedule.doesExist('timeout', key)) {
      this.schedule.deleteTimeout(key)
    }
    this.schedule.addTimeout(
      key,
      setTimeout(async () => {
        // 1天后将redis中的数据flush到milvus中
        // 超时时重新读取，减轻内存压力
        const content = plainToInstance(
          ContentEntity,
          await this.cache.get(key)
        )
        await Promise.all([
          this.vecstoreService.update(
            { collection_name: type },
            content.toDoc()
          ),
          this.cache.del(key),
        ])
      }, DAY_MILLISECONDS)
    )
  }

  @Subscribe('ai_content', 'content_done')
  protected async handleEntitiesDone({ type, ids, done }: ContentDoneMsg) {
    const contents = await this.getBatch({ type, ids })
    const partition_name = done ? PartitionEnum.done : PartitionEnum.undone
    await this.vecstoreService.updateMany(
      { collection_name: type, partition_name },
      contents.map((c) => c.toDoc())
    )
  }

  @Subscribe('ai_content', 'content_remove')
  protected async handleEntityRemove({ type, ids }: ContentRemoveMsg) {
    await Promise.all([
      this.vecstoreService.deleteMany({ collection_name: type }, ids),
      this.cache.del(
        ids.map((id) =>
          ContentKey({
            type,
            id,
          })
        )
      ),
    ])
  }
}
