import { Injectable } from '@nestjs/common'
import { Milvus } from './milvus'
import { Subscribe } from '@app/rmq/decorator'
import { EntityCreateMsg, EntityRemoveMsg } from '@app/rmq/subscribe'
import {
  PositionType,
  QueryParams,
  PartitionEnum,
  Doc,
  SimSearchParams,
  SearchParams,
  VECTOR_DIM,
} from './schema'
import { ContentType } from '@app/rmq/types'
import { OpenAI } from 'langchain/llms/openai'
import { Embeddings } from 'langchain/embeddings/base'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { SummarizeDescPrompt } from './prompt'

@Injectable()
export class VecstoreService {
  vecstore: Milvus
  embeddings: Embeddings
  llm: OpenAI

  constructor() {
    this.vecstore = new Milvus({})
    this.embeddings = new OpenAIEmbeddings({
      modelName: 'text-embedding-ada-002',
    })
    this.llm = new OpenAI({
      modelName: 'gpt-3.5-turbo',
    })
  }

  private _dumbVecs(n: number) {
    return Array<number[]>(n).fill(Array<number>(VECTOR_DIM).fill(0))
  }

  async search(type: ContentType, params: SearchParams, k = 10) {
    return this.vecstore.search(type, params, k)
  }

  async simSearch(type: ContentType, params: SimSearchParams, k = 10) {
    return this.simSearch(type, params, k)
  }

  async query(position: PositionType, params: QueryParams) {
    return this.vecstore.query(position, params)
  }

  async create(position: PositionType, doc: Doc) {
    return this.createMany(position, [doc])
  }

  async createMany(position: PositionType, docs: Doc[]) {
    return this.vecstore.addDocuments(
      position,
      docs,
      this._dumbVecs(docs.length)
    )
  }

  async update(position: PositionType, doc: Doc) {
    return this.updateMany(position, [doc])
  }

  async updateMany(position: PositionType, docs: Doc[]) {
    let vecs: number[][]
    let descs: string[]

    if (position.partition_name === PartitionEnum.undone) {
      // 如果是未完成的文档，不进行embedding，直接填充0向量
      vecs = this._dumbVecs(docs.length)
      descs = Array(docs.length).fill(' ')
    } else {
      vecs = await this.embeddings.embedDocuments(
        docs.map((doc) => doc.pageContent)
      )
      descs = await Promise.all(
        docs.map(async ({ pageContent }) =>
          this.llm.call(SummarizeDescPrompt(pageContent))
        )
      )
    }

    for (let i = 0; i < docs.length; i++) {
      docs[i].metadata.updateAt = new Date()
      docs[i].metadata.desc = descs[i]
    }

    await this.vecstore.delete(
      { collection_name: position.collection_name },
      docs.map((doc) => doc.metadata.id)
    )
    await this.vecstore.addDocuments(position, docs, vecs)
  }

  async delete(position: PositionType, id: number) {
    return this.vecstore.delete(position, [id])
  }

  async deleteMany(position: PositionType, ids: number[]) {
    return this.vecstore.delete(position, ids)
  }

  @Subscribe('ai_vecstore', 'entity_create')
  protected async handleEntityCreate({
    type,
    ids,
    projectId,
  }: EntityCreateMsg) {
    this.createMany(
      {
        collection_name: type,
        partition_name: PartitionEnum.undone,
      },
      ids.map(
        (id) =>
          new Doc({
            metadata: {
              id,
              projectId,
              updateAt: new Date(),
              desc: ' ',
            },
            pageContent: ' ',
          })
      )
    )
  }

  @Subscribe('ai_vecstore', 'entity_remove')
  protected async handleEntityRemove({ type, ids }: EntityRemoveMsg) {
    await this.deleteMany({ collection_name: type }, ids)
  }
}
