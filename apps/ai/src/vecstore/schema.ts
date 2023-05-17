import { ContentType } from '@app/rmq/types'
import { DataType, FieldType } from '@zilliz/milvus2-sdk-node/dist/milvus'
import { Document } from 'langchain/document'
/**
 * 筛选多个文档的条件
 */
export interface QueryParams {
  id?: number[]
  projectId?: number
}

export interface SimSearchParams {
  query: string
  projectId: number
  id?: number[]
}

export interface SearchParams {
  query: number[]
  projectId: number
  id?: number[]
}

export enum PartitionEnum {
  done = 'done',
  undone = 'undone',
}

export interface PositionType {
  collection_name: ContentType
  partition_name?: PartitionEnum
}

export interface DocMetadata {
  id: number
  projectId: number
  updateAt: Date
  desc: string
}

export type Schema = DocMetadata & {
  doc: string
  vec: number[]
}

export class Doc extends Document<DocMetadata> {}

export const VECTOR_DIM = 1536

export const Fields: FieldType[] = [
  { name: 'id', data_type: DataType.Int64, is_primary_key: true },
  { name: 'projectId', data_type: DataType.Int64 },
  {
    name: 'vec',
    data_type: DataType.FloatVector,
    dim: VECTOR_DIM,
  },
  {
    name: 'doc',
    data_type: DataType.VarChar,
    max_length: 4096,
  },
  {
    name: 'desc',
    data_type: DataType.VarChar,
    max_length: 2048,
  },
  {
    name: 'updateAt',
    data_type: DataType.VarChar,
    max_length: 64,
  },
]

export const IndexCreateParams = {
  index_type: 'HNSW',
  metric_type: 'L2',
  params: JSON.stringify({ M: 8, efConstruction: 64 }),
}
