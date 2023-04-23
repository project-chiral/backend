import { EntityCreateMsg, EntityRemoveMsg } from './entity'
import { EventDoneMsg } from './event'

export type RmqSubscribeTypes = {
  entity_create: EntityCreateMsg
  entity_remove: EntityRemoveMsg
  event_done: EventDoneMsg
}

export type RmqSubscribeKeys = keyof RmqSubscribeTypes

export * from './entity'
export * from './event'
