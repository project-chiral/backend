import { Inject, Injectable } from '@nestjs/common'
import { VecstoreService } from '../vecstore/vecstore.service'
import { UpdateContentDto } from './dto/update-content.dto'
import { GetContentQueryDto } from './dto/get-content-query.dto'
import { Subscribe } from '@app/rmq/decorator'
import { EntityDoneMsg, EntityRemoveMsg } from '@app/rmq/subscribe'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { UtilsService } from '@app/utils'
import { ContentEntity } from './entities/content.entity'
import { Cache } from 'cache-manager'

@Injectable()
export class ContentService {
  constructor(
    private readonly vecstoreService: VecstoreService,
    private readonly utilsService: UtilsService,
    @Inject(CACHE_MANAGER) private cache: Cache
  ) {}

  async getContent({ type, id }: GetContentQueryDto) {
    const projectId = this.utilsService.getProjectId()
    const cacheKey = `${projectId}/${type}/${id}/content`
    return this.cache.get<ContentEntity>(cacheKey)
  }

  async updateContent({ type, id, content }: UpdateContentDto) {
    const projectId = this.utilsService.getProjectId()
    const cacheKey = `${projectId}/${type}/${id}/content`
    const entity = new ContentEntity(new Date(), type, id, content)
    await this.cache.set(cacheKey, entity)
  }

  /**
   * entity done后将其flush到milvus中
   *
   * undone后将其从milvus中删除
   */
  @Subscribe('amq.direct', 'entity_done')
  protected async handleEntityDone({ type, ids, done }: EntityDoneMsg) {
    if (done) {
      await this.vecstoreService.flush({
        type,
        ids,
      })
    } else {
      await this.vecstoreService.delete({
        type,
        ids,
      })
    }
  }

  /**
   * event remove后将其从milvus中删除
   */
  @Subscribe('amq.direct', 'entity_remove')
  protected async handleEntityRemove(msg: EntityRemoveMsg) {
    await this.vecstoreService.delete(msg)
  }
}
