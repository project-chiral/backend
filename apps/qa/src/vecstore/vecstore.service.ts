import { Subscribe } from '@app/rmq/decorator'
import { EventDoneMsg, EntityRemoveMsg } from '@app/rmq/subscribe'
import { Injectable } from '@nestjs/common'
import { FilterType, Milvus } from './milvus'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { Document } from 'langchain/document'

@Injectable()
export class VecstoreService {
  vecStore: Milvus
  embeddings: OpenAIEmbeddings

  constructor() {
    this.embeddings = new OpenAIEmbeddings({
      modelName: 'ada',
    })
    this.vecStore = new Milvus(this.embeddings, {
      collectionName: '',
    })
  }

  async search(query: string, k = 10, filter: FilterType) {
    return await this.vecStore.similaritySearchWithScore(query, k, filter)
  }

  /**
   * event done后将其content添加到vecStore中
   *
   * undone后将其从vecStore中删除
   */
  @Subscribe('amq.direct', 'event_done')
  async handleEventDone({ id, done }: EventDoneMsg) {
    if (done) {
      await this.vecStore.addDocuments([
        new Document({
          metadata: { id },
          pageContent: '',
        }),
      ])
    } else {
      await this.vecStore.delete({
        ids: [id],
      })
    }
  }

  /**
   * event remove后将其从vecStore中删除
   */
  @Subscribe('amq.direct', 'entity_remove')
  async handleEntityRemove({ type, ids }: EntityRemoveMsg) {
    if (type !== 'EVENT') {
      return
    }
    await this.vecStore.delete({
      ids,
    })
  }
}
