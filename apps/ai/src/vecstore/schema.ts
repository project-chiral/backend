import { EntityType } from '@app/rmq/types'
import { Document } from 'langchain/document'
/**
 * 筛选多个文档的条件
 */
export interface QueryParams {
  id?: number[]
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
