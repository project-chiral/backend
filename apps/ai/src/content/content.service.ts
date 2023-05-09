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
      projectId,
      type,
      id,
    })
    const content = await this.cache.get(key)
    if (!content) {
      const doc = await this.vecstoreService.query({
        type,
        id,
      })
      if (!doc) {
        throw new NotFoundException()
      }

      const content = ContentEntity.fromDoc(doc)
      await this.cache.set(key, content)
      return content
    }

    return plainToInstance(ContentEntity, content)
  }

  async getBatch({ type, ids }: GetContentsQueryDto) {
    return Promise.all(ids.map((id) => this.get({ type, id })))
  }

  async update({ type, id, content }: UpdateContentDto) {
    const projectId = this.utils.getProjectId()
    const entity = new ContentEntity(new Date(), type, id, content)
    const key = ContentKey({
      projectId,
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
          this.vecstoreService.create(content.toDoc()),
          this.cache.del(key),
        ])
      }, 1000 * 60 * 60 * 24)
    )
  }

  @Subscribe('entity_done')
  protected async handleEntitiesDone({ type, ids, done }: EntityDoneMsg) {
    const contents = await this.getBatch({ type, ids })
    await this.vecstoreService.updateMany(contents.map((c) => c.toDoc(done)))
  }

  @Subscribe('entity_remove')
  protected async handleEntityRemove(msg: EntityRemoveMsg) {
    const projectId = this.utils.getProjectId()

    await Promise.all([
      this.vecstoreService.deleteMany(msg),
      this.cache.del(
        msg.ids.map((id) =>
          ContentKey({
            type: msg.type,
            id,
            projectId,
          })
        )
      ),
    ])
  }
}
