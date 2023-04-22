import { EntityCreateMsg, EntityRemoveMsg } from './entity'
export * from './entity'

const RmqMsgTypes = {
  entity_create: EntityCreateMsg,
  entity_remove: EntityRemoveMsg,
} as const

export type RmqMsgQueue = keyof typeof RmqMsgTypes
