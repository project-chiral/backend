import { ContentType } from '../types'

interface ContentCreateData {
  id: number
  order: number
  name: string
}

export interface ContentCreateMsg {
  type: ContentType
  data: ContentCreateData[]
  projectId: number
}

interface ContentUpdateData {
  id: number
  order?: number
  name?: string
}

export interface ContentUpdateMsg {
  type: ContentType
  data: ContentUpdateData[]
  projectId: number
}

/**
 * 实体done状态变化消息
 */
export interface ContentDoneMsg {
  type: ContentType
  ids: number[]
  projectId: number
  done: boolean
}

/**
 * 实体移除消息
 */
export interface ContentRemoveMsg {
  type: ContentType
  ids: number[]
  projectId: number
}
