import { EntityType } from '../types'

export interface EntityCreateMsg {
  type: EntityType
  ids: number[]
  projectId: number
}

export interface EntityDoneMsg {
  type: EntityType
  ids?: number[]
  projectId?: number
  done: boolean
}

export interface EntityUpdateMsg {
  type: EntityType
  ids: number[]
  projectId: number
}

export interface EntityRemoveMsg {
  type: EntityType
  ids?: number[]
  projectId?: number
}
