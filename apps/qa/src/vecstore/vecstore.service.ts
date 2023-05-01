import { Injectable } from '@nestjs/common'
import { Milvus } from './milvus'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { FilterType } from './types'
import { Interval } from '@nestjs/schedule'

@Injectable()
export class VecstoreService {
  vecStore: Milvus
  embeddings: OpenAIEmbeddings

  constructor() {
    this.embeddings = new OpenAIEmbeddings({
      modelName: 'ada',
    })
    this.vecStore = new Milvus(this.embeddings, {
      collectionName: 'entity_content',
    })
    this.vecStore.ensureCollection()
  }

  /**
   * 将redis中的数据flush到milvus中
   */
  async flush(filter: FilterType) {
    // TODO
    await this.vecStore.flush()
  }

  async search(query: string, k?: number, filter?: FilterType) {
    return this.vecStore.similaritySearchWithScore(query, k, filter)
  }

  async query(filter: FilterType) {
    const [result] = await this.vecStore.query(filter, 1)
    if (result) {
      return result[0]
    }
  }

  async delete(filter: FilterType) {
    return this.vecStore.delete(filter)
  }

  @Interval('flush', 1000 * 60 * 60 * 24)
  protected async flushInterval() {
    await this.flush({})
  }
}
