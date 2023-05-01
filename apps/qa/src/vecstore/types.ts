import { EntityType } from '@app/rmq/types'

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
  [x: string]: string | number[]
}

export const MILVUS_PRIMARY_FIELD_NAME = 'langchain_primaryid'
export const MILVUS_VECTOR_FIELD_NAME = 'langchain_vector'
export const MILVUS_TEXT_FIELD_NAME = 'langchain_text'
export const MILVUS_COLLECTION_NAME_PREFIX = 'langchain_col'

export interface FilterType {
  ids?: number[]
  projectId?: number
  type?: EntityType
}
