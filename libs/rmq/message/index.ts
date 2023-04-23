import { EntityCreateMsg, EntityRemoveMsg } from './entity'
import { EventDoneMsg } from './event'

export type RmqMsgTypes = {
  entity_create: EntityCreateMsg
  entity_remove: EntityRemoveMsg
  event_done: EventDoneMsg
}

export type RmqMsgQueue = keyof RmqMsgTypes

export * from './entity'
export * from './event'
