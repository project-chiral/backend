import { v4 as uuidv4 } from 'uuid'
import { MilvusClient } from '@zilliz/milvus2-sdk-node'
import { DataType } from '@zilliz/milvus2-sdk-node/dist/milvus/const/Milvus.js'
import {
  ErrorCode,
  FieldType,
} from '@zilliz/milvus2-sdk-node/dist/milvus/types.js'
import { VectorStore } from 'langchain/vectorstores/base'
import { Embeddings } from 'langchain/embeddings/base'
import {
  Doc,
  DocMetadata,
  FilterType,
  IndexParam,
  IndexType,
  InsertRow,
  MILVUS_COLLECTION_NAME_PREFIX,
  MilvusLibArgs,
} from './types'

export class Milvus extends VectorStore {
  FilterType: FilterType
  collectionName: string
  numDimensions?: number
  autoId?: boolean
  fields: string[]
  client: MilvusClient

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
    super(embeddings, args)
    this.embeddings = embeddings
    this.collectionName = args.collectionName ?? genCollectionName()

    this.autoId = true
    this.fields = []

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
  _filterExpr(filter: FilterType) {
    const expr: string[] = []

    for (const [key, value] of Object.entries(filter)) {
      if (typeof value === 'string' || typeof value === 'number') {
        expr.push(`${key} == "${value}"`)
      } else if (typeof value === 'boolean') {
        expr.push(`${!value && 'not'} ${key}`)
      } else if (Array.isArray(value)) {
        expr.push(`${key} in [${value}]`)
      }
    }

    return expr.join(' and ')
  }

  async addDocuments(documents: Doc[]): Promise<void> {
    const done: Doc[] = []
    const undone: Doc[] = []

    for (const doc of documents) {
      if (doc.metadata.done) {
        done.push(doc)
      } else {
        undone.push(doc)
      }
    }

    const doneVecs = await this.embeddings.embedDocuments(
      done.map((doc) => doc.pageContent)
    )

    await Promise.all([
      this.addVectors(doneVecs, done),
      this.addVectors(Array(undone.length).fill([]), undone),
    ])
  }

  /**
   * 将不同分区的向量和文档归类，分别插入到不同的分区
   */
  async addVectors(vectors: number[][], documents: Doc[]): Promise<void> {
    const partitionData: Record<
      string,
      { vectors: number[][]; documents: Doc[] }
    > = {}

    for (let i = 0; i < vectors.length; i++) {
      const { type, done } = documents[i].metadata
      const partition = `${type}_${done}`
      if (partitionData[partition] === undefined) {
        partitionData[partition] = {
          vectors: [vectors[i]],
          documents: [documents[i]],
        }
      } else {
        partitionData[partition].vectors.push(vectors[i])
        partitionData[partition].documents.push(documents[i])
      }
    }

    await Promise.all(
      Object.entries(partitionData).map(([partition, { vectors, documents }]) =>
        this._addVectorPartition(vectors, documents, partition)
      )
    )

    await this.flush()
  }

  /**
   * 将向量和文档插入到指定分区
   */
  private async _addVectorPartition(
    vectors: number[][],
    documents: Doc[],
    partition: string
  ): Promise<void> {
    if (vectors.length === 0) {
      return
    }
    await this.ensureCollection(vectors, documents)

    const insertDatas: InsertRow[] = []
    for (let index = 0; index < vectors.length; index++) {
      const vec = vectors[index]
      const doc = documents[index]
      const data: InsertRow = {
        doc: doc.pageContent,
        vec: vec,
      }
      this.fields.forEach((field) => {
        switch (field) {
          case 'id':
            if (!this.autoId) {
              if (doc.metadata['id'] === undefined) {
                throw new Error(
                  `The Collection's primaryField is configured with autoId=false, thus its value must be provided through metadata.`
                )
              }
              data[field] = `${doc.metadata['id']}`
            }
            break
          case 'doc':
            data[field] = doc.pageContent
            break
          case 'vec':
            data[field] = vec
            break
          default: // metadata fields
            if (doc.metadata[field] === undefined) {
              throw new Error(
                `The field "${field}" is not provided in documents[${index}].metadata.`
              )
            } else if (typeof doc.metadata[field] === 'object') {
              data[field] = JSON.stringify(doc.metadata[field])
            } else {
              data[field] = doc.metadata[field]
            }
            break
        }
      })

      insertDatas.push(data)
    }

    const insertResp = await this.client.insert({
      collection_name: this.collectionName,
      partition_name: partition,
      fields_data: insertDatas,
    })
    if (insertResp.status.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error inserting data: ${JSON.stringify(insertResp)}`)
    }
  }

  async hybridSearch(
    params: {
      query?: number[]
      filter?: FilterType
    },
    k?: number
  ) {
    const hasColResp = await this.client.hasCollection({
      collection_name: this.collectionName,
    })
    if (hasColResp.status.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error checking collection: ${hasColResp}`)
    }
    if (hasColResp.value === false) {
      throw new Error(
        `Collection not found: ${this.collectionName}, please create collection before search.`
      )
    }

    const loadResp = await this.client.loadCollectionSync({
      collection_name: this.collectionName,
    })
    if (loadResp.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error loading collection: ${loadResp}`)
    }

    // clone this.field and remove vectorField
    const outputFields = this.fields.filter((field) => field !== 'vec')

    const searchParams = params.query && {
      search_params: {
        anns_field: 'vec',
        topk: k?.toString(),
        metric_type: this.indexCreateParams.metric_type,
        params: this.indexSearchParams,
      },
      vector_type: DataType.FloatVector,
      vectors: [params.query],
    }

    const queryParams = params.filter && {
      partition_names: [params.filter.type],
      expr: this._filterExpr(params.filter),
    }

    const searchResp = await this.client.search({
      collection_name: this.collectionName,
      output_fields: outputFields,
      ...queryParams,
      ...searchParams,
    })
    if (searchResp.status.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error searching data: ${JSON.stringify(searchResp)}`)
    }
    const results: [Doc, number][] = []
    searchResp.results.forEach((result) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fields = { pageContent: '', metadata: {} as DocMetadata }
      Object.keys(result).forEach((key) => {
        if (key === 'doc') {
          fields.pageContent = result[key]
        } else if (this.fields.includes(key)) {
          if (typeof result[key] === 'string') {
            const { isJson, obj } = checkJsonString(result[key])
            fields.metadata[key] = isJson ? obj : result[key]
          } else {
            fields.metadata[key] = result[key]
          }
        }
      })
      results.push([new Doc(fields), result.score])
    })

    return results
  }

  async similaritySearchVectorWithScore(
    query: number[],
    k = 10
  ): Promise<[Doc, number][]> {
    return this.hybridSearch({ query }, k)
  }

  async query(filter: FilterType, k?: number): Promise<[Doc, number][]> {
    return this.hybridSearch({ filter }, k)
  }

  async delete(filter: FilterType) {
    const deleteResp = await this.client.deleteEntities({
      collection_name: this.collectionName,
      partition_name: filter.type,
      expr: this._filterExpr(filter),
    })

    if (deleteResp.status.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Error deleting data: ${JSON.stringify(deleteResp)}`)
    }

    return deleteResp
  }

  async flush() {
    await this.client.flushSync({ collection_names: [this.collectionName] })
  }

  async ensureCollection(vectors?: number[][], documents?: Doc[]) {
    const hasColResp = await this.client.hasCollection({
      collection_name: this.collectionName,
    })
    if (hasColResp.status.error_code !== ErrorCode.SUCCESS) {
      throw new Error(
        `Error checking collection: ${JSON.stringify(hasColResp, null, 2)}`
      )
    }

    if (hasColResp.value === false) {
      if (vectors === undefined || documents === undefined) {
        throw new Error(
          `Collection not found: ${this.collectionName}, please provide vectors and documents to create collection.`
        )
      }
      await this.createCollection(vectors, documents)
    }
  }

  async createCollection(vectors: number[][], documents: Doc[]): Promise<void> {
    const fieldList: FieldType[] = []

    fieldList.push(...createFieldTypeForMetadata(documents))

    fieldList.push(
      {
        name: 'id',
        description: 'Primary key',
        data_type: DataType.Int64,
        is_primary_key: true,
        autoID: this.autoId,
      },
      {
        name: 'doc',
        description: 'Text field',
        data_type: DataType.VarChar,
        type_params: {
          max_length: getTextFieldMaxLength(documents).toString(),
        },
      },
      {
        name: 'vec',
        description: 'Vector field',
        data_type: DataType.FloatVector,
        type_params: {
          dim: getVectorFieldDim(vectors).toString(),
        },
      }
    )

    fieldList.forEach((field) => {
      if (!field.autoID) {
        this.fields.push(field.name)
      }
    })

    const createRes = await this.client.createCollection({
      collection_name: this.collectionName,
      fields: fieldList,
    })

    if (createRes.error_code !== ErrorCode.SUCCESS) {
      throw new Error(`Failed to create collection: ${createRes}`)
    }

    await this.client.createIndex({
      collection_name: this.collectionName,
      field_name: 'vec',
      extra_params: this.indexCreateParams,
    })
  }
}

function createFieldTypeForMetadata(documents: Doc[]): FieldType[] {
  const sampleMetadata = documents[0].metadata
  let textFieldMaxLength = 0
  let jsonFieldMaxLength = 0
  documents.forEach(({ metadata }) => {
    // check all keys name and count in metadata is same as sampleMetadata
    Object.keys(metadata).forEach((key) => {
      if (
        !(key in metadata) ||
        typeof metadata[key] !== typeof sampleMetadata[key]
      ) {
        throw new Error(
          'All documents must have same metadata keys and datatype'
        )
      }

      // find max length of string field and json field, cache json string value
      if (typeof metadata[key] === 'string') {
        if (metadata[key].length > textFieldMaxLength) {
          textFieldMaxLength = metadata[key].length
        }
      } else if (typeof metadata[key] === 'object') {
        const json = JSON.stringify(metadata[key])
        if (json.length > jsonFieldMaxLength) {
          jsonFieldMaxLength = json.length
        }
      }
    })
  })

  const fields: FieldType[] = []
  for (const [key, value] of Object.entries(sampleMetadata)) {
    const type = typeof value
    if (type === 'string') {
      fields.push({
        name: key,
        description: `Metadata String field`,
        data_type: DataType.VarChar,
        type_params: {
          max_length: textFieldMaxLength.toString(),
        },
      })
    } else if (type === 'number') {
      fields.push({
        name: key,
        description: `Metadata Number field`,
        data_type: DataType.Float,
      })
    } else if (type === 'boolean') {
      fields.push({
        name: key,
        description: `Metadata Boolean field`,
        data_type: DataType.Bool,
      })
    } else if (value === null) {
      // skip
    } else {
      // use json for other types
      try {
        fields.push({
          name: key,
          description: `Metadata JSON field`,
          data_type: DataType.VarChar,
          type_params: {
            max_length: jsonFieldMaxLength.toString(),
          },
        })
      } catch (e) {
        throw new Error('Failed to parse metadata field as JSON')
      }
    }
  }
  return fields
}

function genCollectionName(): string {
  return `${MILVUS_COLLECTION_NAME_PREFIX}_${uuidv4().replaceAll('-', '')}`
}

function getTextFieldMaxLength(documents: Doc[]) {
  let textMaxLength = 0
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < documents.length; i++) {
    const text = documents[i].pageContent
    if (text.length > textMaxLength) {
      textMaxLength = text.length
    }
  }
  return textMaxLength
}

function getVectorFieldDim(vectors: number[][]) {
  if (vectors.length === 0) {
    throw new Error('No vectors found')
  }
  return vectors[0].length
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkJsonString(value: string): { isJson: boolean; obj: any } {
  try {
    const result = JSON.parse(value)
    return { isJson: true, obj: result }
  } catch (e) {
    return { isJson: false, obj: null }
  }
}
