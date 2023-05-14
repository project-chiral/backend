import { MilvusClient } from '@zilliz/milvus2-sdk-node'
import { DataType } from '@zilliz/milvus2-sdk-node/dist/milvus/const/Milvus.js'
import { ErrorCode } from '@zilliz/milvus2-sdk-node/dist/milvus/types.js'
import { Embeddings } from 'langchain/embeddings/base'
import { EntityType } from '@app/rmq/types'
import {
  QueryParams,
  PositionType,
  PartitionEnum,
  Doc,
  VECTOR_DIM,
  IndexCreateParams,
  Fields,
  SearchParams,
} from './schema'

export class Milvus {
  FilterType: QueryParams
  fields: string[]
  client: MilvusClient
  embeddings: Embeddings

  indexSearchParams = JSON.stringify({ ef: 64 })

  constructor(
    embeddings: Embeddings,
    args: {
      url?: string
      ssl?: boolean
      username?: string
      password?: string
    }
  ) {
    this.embeddings = embeddings

    this.fields = Fields.map((v) => v.name)

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
      if (typeof value === 'string') {
        expr.push(`${key} == "${value}"`)
      } else if (typeof value === 'boolean' || typeof value === 'number') {
        expr.push(`${key} == ${value}`)
      } else if (Array.isArray(value)) {
        expr.push(`${key} in [${value}]`)
      }
    }

    return expr.join(' and ')
  }

  async addDocuments(position: PositionType, documents: Doc[]): Promise<void> {
    await this.ensureCollection(position.collection_name)

    let vecs: number[][]
    // 如果是未完成的文档，不进行embedding，直接填充0向量
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

  async addVectors(
    position: PositionType,
    data: {
      doc: Doc
      vec: number[]
    }[]
  ): Promise<void> {
    await this.loadCollection(position)

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

  async delete(position: PositionType, ids: number[]) {
    await this.ensureCollection(position.collection_name)

    const deleteResp = await this.client.deleteEntities({
      ...position,
      expr: `id in [${ids}]`,
    })

    if (deleteResp.status.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error deleting data: ${JSON.stringify(deleteResp)}`)
    }

    return deleteResp
  }

  async search(
    position: PositionType,
    { query, ...filter }: SearchParams,
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
        metric_type: IndexCreateParams.metric_type,
        params: this.indexSearchParams,
      },
      vector_type: DataType.FloatVector,
      vectors: [query],
      filter: this._filterExpr(filter),
    })

    if (searchResp.status.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error searching data: ${JSON.stringify(searchResp)}`)
    }

    const results: [Doc, number][] = searchResp.results.map(
      ({ id, projectId, updateAt, doc, desc, score }) => [
        new Doc({
          pageContent: doc,
          metadata: {
            id: +id,
            projectId: +projectId,
            desc,
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
      ({ id, projectId, doc, desc, updateAt }) =>
        new Doc({
          pageContent: doc,
          metadata: {
            id: +id,
            projectId: +projectId,
            updateAt: new Date(updateAt),
            desc,
          },
        })
    )
  }

  async flush(collection_names: EntityType[]) {
    await Promise.all(
      collection_names.map((collection_name) =>
        this.ensureCollection(collection_name)
      )
    )

    await this.client.flushSync({
      collection_names,
    })
  }

  async ensureCollection(collection_name: EntityType) {
    const hasColResp = await this.client.hasCollection({
      collection_name,
    })
    if (hasColResp.status.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error checking collection: ${hasColResp}`)
    }
    if (hasColResp.value === true) {
      return
    }

    const createResp = await this.client.createCollection({
      collection_name,
      fields: Fields,
    })

    if (createResp.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error creating collection: ${createResp.reason}`)
    }

    const createIndexResp = await this.client.createIndex({
      collection_name,
      field_name: 'vec',
      extra_params: IndexCreateParams,
    })

    if (createIndexResp.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error creating index: ${createIndexResp}`)
    }

    for (const partition_name of [PartitionEnum.done, PartitionEnum.undone]) {
      const createPartitionResp = await this.client.createPartition({
        collection_name,
        partition_name,
      })

      if (createPartitionResp.error_code !== ErrorCode.SUCCESS) {
        throw new Error(`Error creating partition: ${createPartitionResp}`)
      }
    }
  }

  async loadCollection(position: PositionType) {
    const hasColResp = await this.client.hasCollection({
      ...position,
    })
    if (hasColResp.status.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error checking collection: ${hasColResp}`)
    }
    if (hasColResp.value === false) {
      await this.ensureCollection(position.collection_name)
    }

    const loadResp = await this.client.loadCollectionSync({
      ...position,
    })
    if (loadResp.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error loading collection: ${loadResp}`)
    }
  }
}
