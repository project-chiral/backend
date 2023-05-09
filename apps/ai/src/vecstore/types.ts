import { EntityType } from '@app/rmq/types'
import { Document } from 'langchain/document'

export interface MilvusLibArgs {
  collectionName?: string
  primaryField?: string
  vectorField?: string
  textField?: string
  url?: string // db address
  ssl?: boolean
  username?: string
  password?: string
}

export type IndexType =
  | 'IVF_FLAT'
  | 'IVF_SQ8'
  | 'IVF_PQ'
  | 'HNSW'
  | 'RHNSW_FLAT'
  | 'RHNSW_SQ'
  | 'RHNSW_PQ'
  | 'IVF_HNSW'
  | 'ANNOY'

export interface IndexParam {
  params: { nprobe?: number; ef?: number; search_k?: number }
}

export interface InsertRow {
  [x: string]: string | number | number[]
}

export const MILVUS_PRIMARY_FIELD_NAME = 'langchain_primaryid'
export const MILVUS_VECTOR_FIELD_NAME = 'langchain_vector'
export const MILVUS_TEXT_FIELD_NAME = 'langchain_text'
export const MILVUS_COLLECTION_NAME_PREFIX = 'langchain_col'

/**
 * 筛选多个文档的条件
 */
export interface QueryParams {
  ids?: number[]
  projectId?: number
}

export enum PartitionEnum {
  done = 'done',
  undone = 'undone',
}

export interface PositionType {
  collection_name: EntityType
  partition_name?: PartitionEnum
}

export interface DocMetadata {
  id: number
  projectId: number
  updateAt: Date
}

export type Schema = DocMetadata & {
  doc: string
  vec: number[]
}

export class Doc extends Document<DocMetadata> {}
