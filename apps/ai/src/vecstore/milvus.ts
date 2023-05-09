import { MilvusClient } from '@zilliz/milvus2-sdk-node'
import { DataType } from '@zilliz/milvus2-sdk-node/dist/milvus/const/Milvus.js'
import { ErrorCode } from '@zilliz/milvus2-sdk-node/dist/milvus/types.js'
import { Embeddings } from 'langchain/embeddings/base'
import {
  Doc,
  QueryParams,
  IndexParam,
  IndexType,
  MilvusLibArgs,
  PartitionEnum,
  PositionType,
} from './types'
import { EntityType } from '@app/rmq/types'

const VECTOR_DIM = 1536

export class Milvus {
  FilterType: QueryParams
  fields: string[]
  client: MilvusClient
  embeddings: Embeddings

  indexParams: Record<IndexType, IndexParam> = {
    IVF_FLAT: { params: { nprobe: 10 } },
    IVF_SQ8: { params: { nprobe: 10 } },
    IVF_PQ: { params: { nprobe: 10 } },
    HNSW: { params: { ef: 10 } },
    RHNSW_FLAT: { params: { ef: 10 } },
    RHNSW_SQ: { params: { ef: 10 } },
    RHNSW_PQ: { params: { ef: 10 } },
    IVF_HNSW: { params: { nprobe: 10, ef: 10 } },
    ANNOY: { params: { search_k: 10 } },
  }

  indexCreateParams = {
    index_type: 'HNSW',
    metric_type: 'L2',
    params: JSON.stringify({ M: 8, efConstruction: 64 }),
  }

  indexSearchParams = JSON.stringify({ ef: 64 })

  constructor(embeddings: Embeddings, args: MilvusLibArgs) {
    this.embeddings = embeddings

    this.fields = ['id', 'doc', 'vec', 'projectId', 'updateAt']

    const url =
      args.url ??
      (typeof process !== 'undefined' ? process.env?.MILVUS_URL : undefined)
    if (!url) {
      throw new Error('Milvus URL address is not provided.')
    }
    this.client = new MilvusClient(url, args.ssl, args.username, args.password)
  }

  /**
   * 将filter转换为boolean表达式
   */
  _filterExpr(filter: QueryParams) {
    const expr: string[] = []

    for (const [key, value] of Object.entries(filter)) {
    }

    return expr.join(' and ')
  }

  async addDocuments(position: PositionType, documents: Doc[]): Promise<void> {
    let vecs: number[][]
    if (position.partition_name === PartitionEnum.undone) {
      vecs = Array(documents.length).fill(Array(VECTOR_DIM).fill(0))
    } else {
      vecs = await this.embeddings.embedDocuments(
        documents.map((doc) => doc.pageContent)
      )
    }

    await this.addVectors(
      position,
      vecs.map((vec, i) => ({
        doc: documents[i],
        vec,
      }))
    )
  }

  /**
   * 将不同分区的向量和文档归类，分别插入到不同的分区
   */
  async addVectors(
    position: PositionType,
    data: {
      doc: Doc
      vec: number[]
    }[]
  ): Promise<void> {
    if (data.length === 0) {
      return
    }

    const insertResp = await this.client.insert({
      ...position,
      fields_data: data.map(({ doc: { metadata, pageContent }, vec }) => ({
        doc: pageContent,
        vec,
        id: metadata.id,
        projectId: metadata.projectId,
        updateAt: metadata.updateAt,
      })),
    })

    if (insertResp.status.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error inserting data: ${JSON.stringify(insertResp)}`)
    }

    await this.flush([position.collection_name])
  }

  async loadCollection(position: PositionType) {
    const hasColResp = await this.client.hasCollection({
      ...position,
    })
    if (hasColResp.status.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error checking collection: ${hasColResp}`)
    }
    if (hasColResp.value === false) {
      throw new Error(
        `Collection not found: ${position}, please create collection before search.`
      )
    }

    const loadResp = await this.client.loadCollectionSync({
      ...position,
    })
    if (loadResp.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error loading collection: ${loadResp}`)
    }
  }

  async search(
    position: PositionType,
    query: number[],
    k: number
  ): Promise<[Doc, number][]> {
    await this.loadCollection(position)

    const searchResp = await this.client.search({
      collection_name: position.collection_name,
      partition_names: [PartitionEnum.done],
      output_fields: this.fields.filter((field) => field !== 'vec'),
      search_params: {
        anns_field: 'vec',
        topk: k?.toString(),
        metric_type: this.indexCreateParams.metric_type,
        params: this.indexSearchParams,
      },
      vector_type: DataType.FloatVector,
      vectors: [query],
    })

    if (searchResp.status.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error searching data: ${JSON.stringify(searchResp)}`)
    }

    const results: [Doc, number][] = searchResp.results.map(
      ({ doc, id, projectId, updateAt, score }) => [
        new Doc({
          pageContent: doc,
          metadata: {
            id: +id,
            projectId: +projectId,
            updateAt: new Date(updateAt),
          },
        }),
        score,
      ]
    )

    return results
  }

  async query(position: PositionType, filter: QueryParams): Promise<Doc[]> {
    await this.loadCollection(position)

    const queryResp = await this.client.query({
      collection_name: position.collection_name,
      partition_names: position.partition_name && [position.partition_name],
      output_fields: this.fields.filter((field) => field !== 'vec'),
      expr: this._filterExpr(filter),
    })

    if (queryResp.status.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error querying data: ${JSON.stringify(queryResp)}`)
    }

    return queryResp.data.map(
      ({ doc, id, projectId, updateAt }) =>
        new Doc({
          pageContent: doc,
          metadata: {
            id: +id,
            projectId: +projectId,
            updateAt: new Date(updateAt),
          },
        })
    )
  }

  async delete(position: PositionType, ids: number[]) {
    const deleteResp = await this.client.deleteEntities({
      ...position,
      expr: `id in [${ids}]`,
    })

    if (deleteResp.status.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error deleting data: ${JSON.stringify(deleteResp)}`)
    }

    return deleteResp
  }

  async flush(collection_names: EntityType[]) {
    await this.client.flushSync({
      collection_names,
    })
  }
}
