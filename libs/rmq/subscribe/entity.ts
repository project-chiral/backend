import { EntityType } from '../types'

export interface EntityCreateMsg {
  type: EntityType
  ids: number[]
  projectId: number
}

export type EntityDoneMsg = {
  type: EntityType
  ids?: number[]
  projectId?: number
  done: boolean
}

export interface EntityRemoveMsg {
  type: EntityType
  ids?: number[]
  projectId?: number
}
