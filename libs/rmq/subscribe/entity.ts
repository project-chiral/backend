import { EntityType } from '../types'

export interface EntityCreateMsg {
  type: EntityType
  ids: number[]
  projectId: number
}

export interface EntityUpdateMsg {
  type: EntityType
  ids: number[]
  projectId: number
}

/**
 * 实体done状态变化消息
 */
export interface EntityDoneMsg {
  type: EntityType
  ids: number[]
  projectId: number
  done: boolean
}

/**
 * 实体移除消息
 */
export interface EntityRemoveMsg {
  type: EntityType
  ids: number[]
  projectId: number
}
