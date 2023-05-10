import { Injectable, NotFoundException } from '@nestjs/common'
import { VecstoreService } from '../vecstore/vecstore.service'
import { UpdateContentDto } from './dto/update-content.dto'
import {
  GetContentQueryDto,
  GetContentsQueryDto,
} from './dto/get-content-query.dto'
import { Subscribe } from '@app/rmq/decorator'
import { EntityDoneMsg, EntityRemoveMsg } from '@app/rmq/subscribe'
import { UtilsService } from '@app/utils'
import { ContentEntity } from './entities/content.entity'
import { ContentKey } from './const'
import { SchedulerRegistry } from '@nestjs/schedule'
import { plainToInstance } from 'class-transformer'
import { CacheService } from '@app/cache'
import { SearchContentQueryDto } from './dto/search-content-query.dto'

@Injectable()
export class ContentService {
  constructor(
    private readonly vecstoreService: VecstoreService,
    private readonly utils: UtilsService,
    private readonly schedule: SchedulerRegistry,
    private cache: CacheService
  ) {}

  async get({ type, id }: GetContentQueryDto) {
    const projectId = this.utils.getProjectId()
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

      const content = new ContentEntity(
        id,
        projectId,
        type,
        doc.pageContent,
        doc.metadata.updateAt
      )
      await this.cache.set(key, content)
      return content
    }

    return plainToInstance(ContentEntity, content)
  }

  async getBatch({ type, ids }: GetContentsQueryDto) {
    return Promise.all(ids.map((id) => this.get({ type, id })))
  }

  async search({ type, query, k }: SearchContentQueryDto) {
    const result = await this.vecstoreService.simSearch(type, query, k)

    return result.map(
      ([doc]) =>
        new ContentEntity(
          doc.metadata.id,
          doc.metadata.projectId,
          type,
          doc.pageContent,
          doc.metadata.updateAt
        )
    )
  }

  async update({ type, id, content }: UpdateContentDto) {
    const projectId = this.utils.getProjectId()
    const entity = new ContentEntity(id, projectId, type, content, new Date())
    const key = ContentKey({
      type,
      id,
    })
    await this.cache.set(key, entity)

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
      }, 1000 * 60 * 60 * 24)
    )
  }

  @Subscribe('entity_done', 'ai_content')
  protected async handleEntitiesDone({ type, ids }: EntityDoneMsg) {
    const contents = await this.getBatch({ type, ids })
    await this.vecstoreService.updateMany(
      { collection_name: type },
      contents.map((c) => c.toDoc())
    )
  }

  @Subscribe('entity_remove', 'ai_content')
  protected async handleEntityRemove({ type, ids }: EntityRemoveMsg) {
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
