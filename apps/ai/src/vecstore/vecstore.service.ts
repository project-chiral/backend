import { Injectable } from '@nestjs/common'
import { Milvus } from './milvus'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { Doc, FilterType, IdType } from './types'
import { Subscribe } from '@app/rmq/decorator'
import { EntityCreateMsg, EntityRemoveMsg } from '@app/rmq/subscribe'

@Injectable()
export class VecstoreService {
  vecstore: Milvus
  embeddings: OpenAIEmbeddings

  constructor() {
    this.embeddings = new OpenAIEmbeddings({
      modelName: 'text-embedding-ada-002',
    })
    this.vecstore = new Milvus(this.embeddings, {
      collectionName: 'entity_content',
    })
    this.vecstore.ensureCollection()
  }

  /**
   * 将redis中的数据flush到milvus中
   */
  async flush() {
    // TODO
    await this.vecstore.flush()
  }

  async search(query: string, filter?: FilterType, k = 1) {
    return this.vecstore.similaritySearchWithScore(query, k, filter)
  }

  async query({ type, id }: IdType) {
    const [result] = await this.vecstore.query({
      type,
      ids: [id],
    })

    return result?.[0]
  }

  async queryMany(filter: FilterType) {
    const result = await this.vecstore.query(filter)
    return result.map((v) => v[0])
  }

  async create(doc: Doc) {
    await this.vecstore.addDocuments([doc])
  }

  async createMany(docs: Doc[]) {
    await this.vecstore.addDocuments(docs)
  }

  async update(doc: Doc) {
    const meta = doc.metadata
    await this.delete({
      type: meta.type,
      id: +meta.id,
    })
    await this.create(doc)
  }

  async updateMany(docs: Doc[]) {
    // TODO
    await Promise.all(docs.map((doc) => this.update(doc)))
  }

  async delete({ type, id }: IdType) {
    return this.vecstore.delete({
      type,
      ids: [id],
    })
  }

  async deleteMany(filter: FilterType) {
    return this.vecstore.delete(filter)
  }

  @Subscribe('entity_create')
  protected async handleEntityCreate({ type, ids }: EntityCreateMsg) {
    this.createMany(
      ids.map(
        (id) =>
          new Doc({
            metadata: {
              id,
              type,
              done: false,
              updateAt: new Date(),
            },
            pageContent: ' ',
          })
      )
    )
  }

  @Subscribe('entity_remove')
  protected async handleEntityRemove(msg: EntityRemoveMsg) {
    await this.deleteMany(msg)
  }
}
