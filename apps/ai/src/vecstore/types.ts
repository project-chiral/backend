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
